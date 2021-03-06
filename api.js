var token = require('./createJWT.js');
const bcrypt = require('bcryptjs');
const sgMail = require("@sendgrid/mail"); 
// sgMail.setApiKey(""); // put new key here 
// ^^ set this api key here or in .env file. 

exports.setApp = function ( app, client )
{

    app.post('/api/addrun', async (req, res, next) => 
    {
      // incoming: userId, color
      // outgoing: error
        
      const { userId, run, time, distance, coordinates, pace, jwtToken } = req.body;

      // cords stuff
       var jsonData = JSON.parse(coordinates);
      console.log(jsonData); 

      function makeArray(d1, d2) {
        var arr = [];
        for(let i = 0; i < d2; i++) {
            arr.push(new Array(d1));
        }
        return arr;
      }

    let cords_array = makeArray(2,jsonData.length); 

    for(var i = 0; i < jsonData.length; i++)
    {
        cords_array[i][0] = jsonData[i].longitude;
        cords_array[i][1] = jsonData[i].latitude; 
    }
		
	  // connect to db
	  const db = client.db();
		
	  let runId = Math.floor( 35 + (Math.random() * (5000 - 1) + 1) + (Math.random() * (5000 - 1) + 1) + (Math.random() * (1000 - 1) + 1) + (Math.random() * (5000 - 1) + 1) + (Math.random() * (500 - 1) + 1) + (Math.random() * (500 - 1) + 1) ) ;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      console.log(coordinates); 
      console.log(typeof(coordinates)); 
       
      var datecreated = new Date().toLocaleString();
      let _userid = parseInt(userId);
      let _time = parseInt(time);
      let _distance = parseFloat(distance);
    
      const newRun = {Run:run,UserId:_userid, RunId: runId,  DateCreated:datecreated , Time:_time, Distance:_distance, Pace: pace, Coordinates: cords_array };
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';

      // update total runs, total distance and total time. 
      // grab the old that is stored and add it to the current info. 
      let _oldData = await db.collection('Users').find({UserId : _userid}).toArray();
      console.log(_oldData)

      // addd it to current data.
      let _newTotalDistance = _oldData[0].TotalDistance + _distance;
      let _parsedTotalDistance = parseFloat(_newTotalDistance);
      console.log('Total distance:' + _parsedTotalDistance);

      let _newTotalTime = _oldData[0].TotalTime + _time;
      let _parsedTotalTime = parseInt(_newTotalTime);
      console.log('Total Time:' + _parsedTotalTime);


      try
      {
        // add the run
        const result =  await db.collection('Runs').insertOne(newRun);
        
        // update total runs. 
        const result1 = await db.collection('Users').updateOne(
            { "UserId" : _userid },
             { $inc: { "TotalRuns": 1 } }
            );  
        // update total distance and total time. 
        const result2 = await db.collection('Users').updateOne(
            { "UserId" : _userid },
             { $set : { "TotalDistance": _parsedTotalDistance, "TotalTime": _parsedTotalTime }}
            );        
      }
      catch(e)
      {
        error = e.toString();
      }
    
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });

    app.post('/api/getcords', async (req, res, next) =>
    {
      const db = client.db();
      let bing =  await db.collection('Runs').find({RunId
        : 5013}).toArray(); // 

      console.log(bing[0].Coordinates);

    });

    // delete run 
    app.post('/api/deleterun', async (req, res, next) =>
    {
      // incoming: run
      // outgoing: error
        
      const { runid, jwtToken } = req.body;

      let _runid = parseInt(runid); 

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      // const db = client.db();
      // const deleteRun = await db.collection('Runs').find({Run:run}); // might need to add .toarray if not working. 
      // console.log(deleteRun)
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
    
      try
      {
        const db = client.db();
        const result = await db.collection('Runs').deleteOne({ RunId : _runid });
		// console.log(result);
      }
      catch(e)
      {
        error = e.toString();
      }
    
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
    
    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: id, firstName, lastName, error
    
     var error = '';
    
      const { login, password } = req.body;
    
      const db = client.db();
      const results = await db.collection('Users').find({Login:login}).toArray(); 
      const verified = results[0].IsVerified; 
	  // console.log(password);
      // console.log(results[0].Password);
	  const validPassword = await bcrypt.compare(password,results[0].Password);
      // const results = await User.find({ Login: login, Password: password});
      // console.log(results);

      var id = -1;
      var fn = '';
      var ln = '';
	  let totalruns_ = '';
	  let totaltime_ = '';
	  let totaldistance_ = '';

	

      var ret;
    
      if( results.length > 0 )
      {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;


        totalruns_ = "" + results[0].TotalRuns + "";
        totaltime_ = "" + results[0].TotalTime + "";
        totaldistance_ = "" + results[0].TotalDistance + ""; 

        try
        {
          const token = require("./createJWT.js");
           ret = {token: token.createToken( fn, ln, id )}; // , totalruns:totalruns_, totaltime:totaltime_, totaldistance :totaldistance_  
           // var ret = { results:_ret, error: error, jwtToken: refreshedToken };
        }
        catch(e)
        {
          ret = {error:e.message};
        }
      }
      else
      {
          ret = {error:"Login/Password incorrect"};
      }
      // check if verified
      if ( verified == false){
          res.status(400).json({ error: "Check your email for code to verify your account!" });
      }
      if(validPassword){
	      res.status(200).json(ret);
	  } else{
	    res.status(400).json({ error: "Invalid Password" });
	  }
    });
    
    app.post('/api/searchruns', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error
    
      var error = '';
    
      const { userId, search, jwtToken } = req.body;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }
      let _userid = parseInt(userId); 
      
      var _search = search.trim();
      
      const db = client.db();
      const results = await db.collection('Runs').find( { $and: [ { Run: {$regex:_search+'.*', $options:'i'} }, { UserId: _userid } ] } ).toArray(); // .find({"Run":{$regex:_search+'.*', $options:'r'}}).toArray();
      // const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });

          
      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i] );
        // DateCreated
      }
      
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { results:_ret, error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });


    app.post('/api/register', async (req, res, next) => 
    {
      // connect to db
      const db = client.db();

      // req.body to pull the info from the webpage. 
      const { email, firstname, lastname, login, password: plainTextPassword  } = req.body

      // set userId to the unique username and email combo 
      const userId_array = await db.collection('Users').find().toArray();
        
      var arraylength = userId_array.length
	  
      // check if a user already has this id, 
      const id_check = await db.collection('Users').find({UserId:arraylength + 1}).toArray();
      // if the array bigger than 0 we need to fix our id. 
      if (id_check.length > 0)
      {
        console.log("TAKEN"); 
        arraylength = Math.floor(arraylength + 35 + (Math.random() * (500 - 1) + 1) + (Math.random() * (500 - 1) + 1)) ;
        console.log(arraylength); 
      }


      // bcrypt to encrypt password  
      const password = await bcrypt.hash(plainTextPassword, 10)
      
      // lets make an empty friends array.
      let friends_array = [];
      let defaultValue = 0;
      let defaultDistance = 0.00000001;
        
      // create key to verify.
      let key = Math.floor(Math.random() * (9999 - 1000) + 1000);
        
      console.log(key); 
      let verify = false;

      // create a new user 
      const fullname = firstname + ' ' + lastname;
      const newUser = {Email:email, UserId: arraylength + 1, FirstName:firstname, LastName:lastname, FullName:fullname,
         Login:login, Password:password, TotalRuns:defaultValue, TotalDistance:defaultDistance, TotalTime:defaultValue, Key:key, FriendsArray:friends_array, IsVerified:verify }; // add userid UserId:userId

      
      // check if email is taken,
      const email_check = await db.collection('Users').find({Email:email}).toArray();

      //console.log(email_check); 
      if(Array.isArray(email_check) && email_check.length)
      {
        // console.log('User Not created')
        return res.json({ status:'Email already taken!'})
      }

      // check if username is taken,
      const username_check = await db.collection('Users').find({Login:login}).toArray();
      if( Array.isArray(username_check) && username_check.length)
      {
        // console.log('User Not created')
        return res.json({ status:'UserName already taken!'})
      }

      // SEND CONFIRM EMAIL:
      const msg = {
        to: "" + email + "",
        from: "akbobsmith79@gmail.com",
        subject: "Here is your email buddy",
        text: "Enter this key: "+ key + "" 
      };
      
      sgMail.send(msg).then(() => {
      console.log('Message sent')
      }).catch((error) => {
      console.log(error.response.body)
      // console.log(error.response.body.errors[0].message)
      }) 
    
      try{
        const new_user = await db.collection('Users').insertOne(newUser);
        console.log('User created')

      } 
      catch(e){
        // console.log(error)
        return res.json({ status:'error'})
      }

      res.json({status: 'All Good'});

    });
    
    app.post('/api/searchusers', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error

      var error = '';

      const {  search, jwtToken } = req.body;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      var _search = search.trim();

      const db = client.db();
      const results = await db.collection('Users').find({"FullName":{$regex:_search+'.*', $options:'i'}}).toArray();
      // const results = await Card.find({ "Card": { $regex: _search + '.', $options: 'r' } });

      var _fullNameArray = [];
      var _userIdArray = [];
      var _emailArray = [];
      var _resultsarray = [];

      for( var i=0; i<results.length; i++ )
      {
        _resultsarray.push( results[i]);
      }

      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }

      var ret = { results : _resultsarray, error: error, jwtToken: refreshedToken }; // fullName:_fullNameArray, email:_emailArray, userId:_userIdArray,

      res.status(200).json(ret);
    });

    app.post('/api/searchuserswofriends', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error

      var error = '';

      const { userId, search, jwtToken } = req.body;

      let _userid = parseInt(userId); 

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      var _search = search.trim();

      const db = client.db();
      let results12 = await db.collection('Users').find({ "UserId":_userid }).toArray();
      // console.log(results12);
      let friends_array = results12[0].FriendsArray; 
      let results = await db.collection('Users').find({"FullName":{$regex:_search+'.*', $options:'i'}}).toArray();
      // const results = await Card.find({ "Card": { $regex: _search + '.', $options: 'r' } });

      console.log(results)

      var _resultsarray = [];


      let _useridarray = [];
      for(let i = 0; i < results.length; i++)
      {
        _useridarray.push(results[i].UserId);
      }

      let results1233 = [];
      
      // results123 = results.filter(item => item !== $in : friends_array); // .splice(i,1);

  
      let array1 = _useridarray;
      let array2 = friends_array;
      let filteredArray1 = array1.filter(el => !array2.includes(el));
      console.log(filteredArray1)
      // console.log(friends_array);
      // console.log(array1) 
      // console.log(_userid)

      let array34 = [];
      array34.push(_userid); 
      // console.log(array34)
      // console.log( filteredArray1[0])
      // console.log(_userid)
      

      for(let i = 0; i < filteredArray1.length; i++)
      {
        if(filteredArray1[i] == _userid)
        {
          results1233 = filteredArray1.filter(el => !array34.includes(el)); 
        }
        else
        {
          results1233.push(filteredArray1[i])
        }
      }
      console.log(results1233); 

      // the filteredArray now hold the id's of who we want. so we need another db lookup based on this array. 
      let results12345 = await db.collection('Users').find({ "UserId" : {$in :  results1233} }).toArray();

      for( var i=0; i<results12345.length; i++ )
      {
        _resultsarray.push( results12345[i]);
      }

      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }

      var ret = { results : _resultsarray, error: error, jwtToken: refreshedToken }; // fullName:_fullNameArray, email:_emailArray, userId:_userIdArray,

      res.status(200).json(ret);
    });
     
    app.post('/api/deleteuser', async (req, res, next) =>
    {
      // incoming: userId
      // outgoing: error
        
      const { userId, jwtToken } = req.body;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }
      let _userid = parseInt(userId); 

      // connect tot db. 
      const db = client.db();
    
      // update any users that has them in their friend array. 
      
      // check if they have the user id of the soon to be removed user in the friends array
      db.collection('Users').updateMany(
        { FriendsArray: _userid},
        { $pull : {FriendsArray : _userid } }
         );

      var error = '';
    
      try
      {
        const result = await db.collection('Users').deleteOne({UserId : _userid});
		// console.log(result);
      }
      catch(e)
      {
        error = e.toString();
      }
    
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
    
    app.post('/api/editUser', async (req, res, next) => 
    {
      // incoming: userId
      // outgoing: results[], error
    
      var error = '';
    
      let { userId, firstname, lastname, username, email, jwtToken } = req.body; 

      let _userid = parseInt(userId); 

      try
      {
        if( token.isExpired(jwtToken)) 
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''}; 
          res.status(200).json(r); 
          return; 
        } 
      }
      catch(e)
      {
        console.log(e.message);
      }
      
      const db = client.db();
      let _fullname;
      
      // gather empty strings 
      let _user = await db.collection('Users').find( { "UserId": _userid }).toArray();

      if(firstname == '') 
        firstname = _user[0].FirstName;
      if(lastname == '')
        lastname = _user[0].LastName;
      if(email == '')
        email = _user[0].Email;
      if(username == '')
        username = _user[0].Login;  

      // set _fullname
      _fullname = firstname + ' ' + lastname;
      
      // check database 

      // lets update the user  
      try{
          // 
          // const results = await db.collection('Users').updateOne({ UserId : userId }, { $set : { FirstName: firstname, LastName: lastname, Email: email}}); //.updateOne(UserId:userId, { $set: {FirstName:firstname},{LastName:lastname},{Email:email}}).toArray();
          db.collection('Users').updateOne(
            { "UserId" : _userid },
            { $set: { "FirstName" : firstname , "LastName" : lastname, "FullName" : _fullname, "Login" : username, "Email" : email } }
            );
           // console.log(results); 
      } catch(e){
        console.log(e);
      }
      
 
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken }; // results:_ret,
      
      res.status(200).json(ret);
    });

    app.post('/api/editPassword', async (req, res, next) => 
    {
      // incoming: userId
      // outgoing: results[], error
    
      var error = '';
    
      const { userId, existing_password, new_password, jwtToken } = req.body; 

      let _userid = parseInt(userId); 

      try
      {
        if( token.isExpired(jwtToken)) 
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''}; 
          res.status(200).json(r); 
          return; 
        } 
      }
      catch(e)
      {
        console.log(e.message);
      }
      
      const db = client.db();
    
      // check database if exisiting password matches. 
      let _passwordcheck = await db.collection('Users').find( { "UserId": _userid }).toArray(); 

      // check with bcrypt compare 
      const isSamePassword = await bcrypt.compare(existing_password,_passwordcheck[0].Password);

      // encrpyt password 
      let _newPassword = await bcrypt.hash(new_password, 10)

      // if the passwords match, update the database, if not send back error, doesnt match. 
      if(isSamePassword)
      {
        try{
          db.collection('Users').updateOne(
            { "UserId" : _userid },
            { $set: { "Password" : _newPassword } }
            );
           // console.log(results); 
        } catch(e){
        console.log(e);
        }
      }
      else{
        var r = {error:'Passwords do not match!'};
        res.status(200).json(r);
      }

      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken }; // results:_ret,
      
      res.status(200).json(ret);
    });
    
    app.post('/api/addfriend', async (req, res, next) =>
    {
      // incoming: userId, 
      // outgoing: error
        
      const { userId, userId_toadd, jwtToken } = req.body;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      let _userid = parseInt(userId); 
      let _useridtoadd = parseInt(userId_toadd); 
       
     
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
        
      // connect to db. 
      const db = client.db();
        // check if friend is already added, 
      const check = await db.collection('Users').find( { $and: [ { "UserId": _userid }, { FriendsArray: _useridtoadd  } ] } ).toArray(); // .find({"Run":{$regex:_search+'.*', $options:'r'}}).toArray();
       console.log(check); 
        
       if (Array.isArray(check) && check.length )
        { 
          var r = {error:'You already have this user added as a friend!'};
          res.status(200).json(r);
          return;
        }
      
      
   
      try
      {
        const result = db.collection('Users').updateOne(
            { "UserId" : _userid },
            { $push: { "FriendsArray" : _useridtoadd } }
            );
        // newCard.save();        
      }
      catch(e)
      {
        error = e.toString();
      }
    
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
    
    app.post('/api/removefriend', async (req, res, next) =>
    {
      // incoming: userId, 
      // outgoing: error
        
      const { userId, userId_toremove, jwtToken } = req.body;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      let _userid = parseInt(userId); 
      let _useridtoremove = parseInt(userId_toremove); 
       
     
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
        
      // connect to db. 
      const db = client.db();
   
      try
      {
        const result = db.collection('Users').updateOne(
            { "UserId" : _userid },
            { $pull: { "FriendsArray" : _useridtoremove } }
            );
        // newCard.save();        
      }
      catch(e)
      {
        error = e.toString();
      }
    
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
    
    app.post('/api/listfriends', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error
    
      var error = '';
    
      const { userId, jwtToken } = req.body;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      let _userid = parseInt(userId); 
      
      
      const db = client.db();
      const results = await db.collection('Users').find( { "UserId": _userid }).toArray(); 
    
      // fill arrray with the friends of user. 
      let fill_array = results[0].FriendsArray;
      var arrayOfNumbers = fill_array.map(Number);
      // console.log(fill_array);
     
 
        
      // Now lets find all these users, or this users friends, and return all that info for front end. 
      const results3 = await db.collection('Users').find( { UserId: { $in : arrayOfNumbers}}).toArray(); 
      
      // console.log(results3); 
        var _ret = [];
        _ret.push( results3 );
        
    //  var _ret = [];
    //  for( var i=0; i <= results3.length; i++ )
    //  { 
   //       _ret.push( results3 );
    //  }
      
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { results:_ret, error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
    
     app.post('/api/searchfriends', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error
    
      var error = '';
    
      const { userId, search } = req.body;
      let _userid = parseInt(userId); 

      
      var _search = search.trim();
      
      const db = client.db();
         // lets get logged in user 
      const results = await db.collection('Users').find( { "UserId": _userid }).toArray(); 
    
      // fill arrray with all friends id's. 
      let fill_array = results[0].FriendsArray;
	  var arrayOfNumbers = fill_array.map(Number);

	  //console.log(fill_array[0]); 
	  console.log(arrayOfNumbers); 
     
 
      // Now lets find all these users, or this users friends, and return all that info for front end. 
                                               //    .find( { $and: [ { "UserId": userId }, { FriendsArray:userId_toadd  } ] } ).toArray();
      let results3 = await db.collection('Users').find( { $and: [ { "UserId": { $in : arrayOfNumbers}} , {"FullName" : {$regex: _search +'.*', $options:'i'}} ] } ).toArray();       
	   console.log(results3); 
		 
		 // .find( { $and: [ { "UserId": { $in : fill_array}} , {"FullName" : {$regex: _search +'.*', $options:'r'}} ] } ).toArray();    
         
      // now that we have those users, lets remove ones that we are not searching for. 
       //  console.log(results3);
      
      
    
      var _fullNameArray = [];
      var _userIdArray = [];
      var _emailArray = []; 
      let _results = [];
      let _emptyarray = [];
       // if the array is emptty lets return null instead of an empty array. 
       if(results3.length == 0)
       {
        var ret = { results: _emptyarray, error: error };
        res.status(200).json(ret);
       }
       if(results3.length > 0)
       {
        for( var i=0; i<results3.length; i++ )
        {
          // _emailArray.push( results3[i].Email);
          // _userIdArray.push( results3[i].UserId);
          // _fullNameArray.push( results3[i].FirstName + ' ' + results3[i].LastName);
          _results.push(results3[i]); 
        }
        var ret = { results : _results, error: error}; // fullName:_fullNameArray, email:_emailArray, userId:_userIdArray,
        res.status(200).json(ret);
       }
    });
    
    app.post('/api/verifyuser', async (req, res, next) => 
    {    
      var error = '';
      const {  text } = req.body;
      
        
      // connect to the db 
      const db = client.db();
      // grab user 
      const results = await db.collection('Users').find( { }).toArray();
      // check if key matches. 
      console.log(results[results.length - 1].Key);
      if ( text.toString().localeCompare( results[results.length - 1].Key ) != 0 )
      {
        console.log('Key does not match!');
        var r = {error:'Key does not match!'};
        res.status(200).json(r);
        return;
      }
      
      // lets update the user  
      try{
          // const results = await db.collection('Users').updateOne({ UserId : userId }, { $set : { FirstName: firstname, LastName: lastname, Email: email}}); //.updateOne(UserId:userId, { $set: {FirstName:firstname},{LastName:lastname},{Email:email}}).toArray();
          db.collection('Users').updateOne(
            { "UserId" : results[results.length - 1].UserId },
            { $set: { "IsVerified" : true  } }
            );
           // console.log(results); 
      } catch(e){
        console.log(e);
      }
      
      
      var ret = { error: error }; // results:_ret,
      
      res.status(200).json(ret);
    });
	
	  app.post('/api/deleteallusers', async (req, res, next) =>
    {
      // incoming: userId
      // outgoing: error
        
       // const { userId, jwtToken } = req.body;

    
      // const db = client.db();
      // const deleteRun = await db.collection('Runs').find({Run:run}); // might need to add .toarray if not working. 
      // console.log(deleteRun)
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
    
      try
      {
        const db = client.db();
        const result = await db.collection('Users').remove({});
		console.log("Deleted all users!"); 
		// console.log(result);
      }
      catch(e)
      {
        error = e.toString();
      }
    
     
      var ret = { error: error };
      
      res.status(200).json(ret);
    });

    app.post('/api/deleteallruns', async (req, res, next) =>
    {
      // incoming: userId
      // outgoing: error
        
       // const { userId, jwtToken } = req.body;

    
      // const db = client.db();
      // const deleteRun = await db.collection('Runs').find({Run:run}); // might need to add .toarray if not working. 
      // console.log(deleteRun)
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
    
      try
      {
        const db = client.db();
        const result = await db.collection('Runs').remove({});
		    console.log("Deleted all Runs!"); 
		// console.log(result);
      }
      catch(e)
      {
        error = e.toString();
      }
    
     
      var ret = { error: error };
      
      res.status(200).json(ret);
    });
	
	  app.post('/api/sendpasswordemail', async (req, res, next) =>
    {
  
        
      const { email } = req.body;

    
      var error = '';
		  
	  // key 
      // create key to verify.
      let passwordkey = Math.floor(Math.random() * (9999 - 1000) + 1000);
        
      console.log(passwordkey); 
	  // SEND CONFIRM EMAIL:
      
      const msg = {
        to: "" + email + "",
        from: "akbobsmith79@gmail.com",
        subject: "Password Reset Email",
        text: " To reset your password Enter this key: "+ passwordkey + "" 
      };
      
      sgMail.send(msg).then(() => {
      console.log('Message sent')
      }).catch((error) => {
      console.log(error.response.body)
      // console.log(error.response.body.errors[0].message)
      }) 
	  
    
      try
      {
        const db = client.db();
        const result1 = db.collection('Users').updateOne(
            { "Email" : email },
             { $set: { PasswordKey: passwordkey }  },
			 { upsert: true }
            ); 
		console.log("Updated Passoword Key in db. "); 
		// console.log(result);
      }
      catch(e)
      {
        error = e.toString();
      }
    
     
      var ret = { error: error };
      
      res.status(200).json(ret);
    });
	
	 app.post('/api/passwordreset', async (req, res, next) =>
    {
	   // The new password should also be typed in. 
	   const { passkey, newPass } = req.body;
	   // first we gotta verify the key.

     let _passkey = parseInt(passkey); 
	
	   // connect to the db 
      const db = client.db();
      // grab user 
      const results = await db.collection('Users').find( { "PasswordKey": _passkey }).toArray(); 
      // check if key matches. 
      if ( _passkey.toString().localeCompare( results[0].PasswordKey) != 0 )
       {
          console.log('Key does not match!');
          var r = {error:'Key does not match!'};
          res.status(200).json(r);
          return;
      
       }
      // encrypt the password using bycrpt. 
      const password = await bcrypt.hash(newPass, 10)
		 
      var error = '';
    
      try
      {
        // try to update password
        // update the user !
        const result1 = db.collection('Users').updateOne(
            { "PasswordKey" : _passkey },
             {  $set: {"Password": password }  }
            );
		console.log("Updated password for user!"); 
		// console.log(result);
      }
      catch(e)
      {
        error = e.toString();
      }
    
     
      var ret = { error: error };
      
      res.status(200).json(ret);
    });
	
	app.post('/api/editRun', async (req, res, next) => 
    {

      var error = '';
    
      const { userId, newrunName, runId } = req.body; // have to figure out how to get the runId from front end. 
      let _userid = parseInt(userId); 
      let _runid = parseInt(runId); 

      // connect to database. 
      const db = client.db();  
      // lets update the run  
      try{
          db.collection('Runs').updateOne(
            { "UserId" : _userid, "RunId" : _runid },
            { $set: { "Run" : newrunName } }
            );
           // console.log(results); 
      } catch(e){
        console.log(e);
      }
      
      var ret = { error: error }; 
      
      res.status(200).json(ret);
    });   
}



