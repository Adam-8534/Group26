var token = require('./createJWT.js');
const bcrypt = require('bcryptjs');
const sgMail = require("@sendgrid/mail"); 
sgMail.setApiKey // put new key here 


exports.setApp = function ( app, client )
{

    app.post('/api/addrun', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
        
      const { userId, run, jwtToken } = req.body;

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
       
      var datecreated = new Date().toLocaleString();
    
      const newRun = {Run:run,UserId:userId, DateCreated:datecreated , Time:0, Distance:0, Pace:0};
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
    
      try
      {
        const db = client.db();
        const result = db.collection('Runs').insertOne(newRun);
        
        // update the user !
        const result1 = db.collection('Users').updateOne(
            { "UserId" : userId },
             { $inc: { "TotalRuns": 1 } }
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

    // delete run 
    app.post('/api/deleterun', async (req, res, next) =>
    {
      // incoming: userId
      // outgoing: error
        
      const { userId, run, jwtToken } = req.body;

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
        const result = await db.collection('Runs').deleteOne({Run:run});
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
           ret = {token: token.createToken( fn, ln, id ), totalruns:totalruns_, totaltime:totaltime_, totaldistance :totaldistance_  };
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
      
      var _search = search.trim();
      
      const db = client.db();
      const results = await db.collection('Runs').find( { $and: [ { Run: {$regex:_search+'.*', $options:'r'} }, { UserId: userId } ] } ).toArray(); // .find({"Run":{$regex:_search+'.*', $options:'r'}}).toArray();
      // const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });
            
      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Run );
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


      // bcrypt to encrypt password  *** need to do**** 
      const password = await bcrypt.hash(plainTextPassword, 10)
      
      // lets make an empty friends array.
      let friends_array = [];
      let defaultValue = 0;
        
      // create key to verify.
      let key = Math.floor(Math.random() * (9999 - 1000) + 1000);
        
      console.log(key); 
      let verify = false;

      // create a new user 
      const fullname = firstname + ' ' + lastname;
      const newUser = {Email:email, UserId: arraylength + 1, FirstName:firstname, LastName:lastname, FullName:fullname,
         Login:login, Password:password, TotalRuns:defaultValue, TotalDistance:defaultValue, TotalTime:defaultValue, Key:key, FriendsArray:friends_array, IsVerified:verify }; // add userid UserId:userId

      
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
      
      var _search = search.trim();
      
      const db = client.db();
      const results = await db.collection('Users').find({"FullName":{$regex:_search+'.*', $options:'r'}}).toArray();
      // const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });
            
      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Email);
        _ret.push( results[i].UserId);
        _ret.push( results[i].FirstName);
        _ret.push( results[i].LastName);
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
    
    // delete user NOT WORKING 
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
    
      // const db = client.db();
      // const deleteRun = await db.collection('Runs').find({Run:run}); // might need to add .toarray if not working. 
      // console.log(deleteRun)
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
    
      try
      {
        const db = client.db();
        const result = await db.collection('Users').deleteOne({UserId:userId});
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
    
      const { userId, firstname, lastname, email, jwtToken } = req.body;

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
      // lets update the user  
      try{
          // const results = await db.collection('Users').updateOne({ UserId : userId }, { $set : { FirstName: firstname, LastName: lastname, Email: email}}); //.updateOne(UserId:userId, { $set: {FirstName:firstname},{LastName:lastname},{Email:email}}).toArray();
          db.collection('Users').updateOne(
            { "UserId" : userId },
            { $set: { "FirstName" : firstname , "LastName" : lastname, "Email" : email } }
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
       
     
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
        
      // connect to db. 
      const db = client.db();
        // check if friend is already added, 
      const check = await db.collection('Users').find( { $and: [ { "UserId": userId }, { FriendsArray:userId_toadd  } ] } ).toArray(); // .find({"Run":{$regex:_search+'.*', $options:'r'}}).toArray();
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
            { "UserId" : userId },
            { $push: { "FriendsArray" : userId_toadd } }
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
       
     
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
        
      // connect to db. 
      const db = client.db();
   
      try
      {
        const result = db.collection('Users').updateOne(
            { "UserId" : userId },
            { $pull: { "FriendsArray" : userId_toremove } }
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
      
      
      const db = client.db();
      const results = await db.collection('Users').find( { "UserId": userId }).toArray(); 
    
      // fill arrray with the friends of user. 
      let fill_array = results[0].FriendsArray;
     
 
        
      // Now lets find all these users, or this users friends, and return all that info for front end. 
      const results3 = await db.collection('Users').find( { UserId: { $in : fill_array}}).toArray(); 
      
      console.log(results3); 
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

      
      var _search = search.trim();
      
      const db = client.db();
         // lets get logged in user 
      const results = await db.collection('Users').find( { "UserId": userId }).toArray(); 
    
      // fill arrray with the friends of user. 
      let fill_array = results[0].FriendsArray;
     
 
      // Now lets find all these users, or this users friends, and return all that info for front end. 
                                               //    .find( { $and: [ { "UserId": userId }, { FriendsArray:userId_toadd  } ] } ).toArray();
      const results3 = await db.collection('Users').find( { $and: [ { "UserId": { $in : fill_array}} , {FullName:{$regex:_search+'.*', $options:'r'}} ] } ).toArray();    
         
      // now that we have those users, lets remove ones that we are not searching for. 
         console.log(results3);
      
      
         var _ret = [];
        _ret.push( results3 );
      
     
    
      var ret = { results:_ret, error: error };
      
      res.status(200).json(ret);
    });
    
    app.post('/api/verifyuser', async (req, res, next) => 
    {
      // incoming: userId
      // outgoing: results[], error
    
      var error = '';
    
      const { userId, text, jwtToken } = req.body;

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
        
      // connect to the db 
      const db = client.db();
      // grab user 
     const results = await db.collection('Users').find( { "UserId": userId }).toArray(); 
      // check if key matches. 
      console.log(results[0].Key);  
       if ( text.localeCompare( results[0].Key) != 0 )
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
            { "UserId" : userId },
            { $set: { "IsVerified" : true  } }
            );
           // console.log(results); 
      } catch(e){
        console.log(e);
      }
      
      
      var ret = { error: error }; // results:_ret,
      
      res.status(200).json(ret);
    });
    
    
    
}


