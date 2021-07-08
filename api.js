var token = require('./createJWT.js');
const bcrypt = require('bcryptjs');


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
    
      const newRun = {Run:run,UserId:userId};
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
    
      try
      {
        const db = client.db();
        const result = db.collection('Runs').insertOne(newRun);
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
	  // console.log(password);
      // console.log(results[0].Password);
	  const validPassword = await bcrypt.compare(password,results[0].Password);
      // const results = await User.find({ Login: login, Password: password});
      // console.log(results);

      var id = -1;
      var fn = '';
      var ln = '';

      var ret;
    
      if( results.length > 0 )
      {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;

        try
        {
          const token = require("./createJWT.js");
          ret = token.createToken( fn, ln, id );
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
		  arraylength = arraylength + 35 + (Math.random() * (500 - 1) + 1) + (Math.random() * (500 - 1) + 1) ;
	  }


      // bcrypt to encrypt password  *** need to do**** 
      const password = await bcrypt.hash(plainTextPassword, 10)
      

      // create a new user 
      const fullname = firstname + ' ' + lastname;
      const newUser = {Email:email, UserId: arraylength + 1, FirstName:firstname, LastName:lastname, FullName:fullname, Login:login, Password:password }; // add userid UserId:userId

      
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
        
    
      try{
        const new_user = await db.collection('Users').insertOne(newUser);
        console.log('User created')

      } 
      catch(e){
        // console.log(error)
        return res.json({ status:'error'})
      }

      res.json({Status: 'All Good'}); 

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
      
            
  /*    var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Email);
        _ret.push( results[i].UserId);
        _ret.push( results[i].FirstName);
        _ret.push( results[i].LastName);
      }
   */   
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
    
}


