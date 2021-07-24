import React, { useState } from 'react';
import axios from 'axios';

function RunUI()
{

    var bp = require('../Path.js');
    var storage = require('../../tokenStorage.js');
    const jwt = require("jsonwebtoken");
    
    var run = '';
    var search = '';
    let searchUserName = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [runList,setRunList] = useState('');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
	
    const addRun = async event => 
    {
	    event.preventDefault();

        var tok = storage.retrieveToken();
       var obj = {userId:userId,run:run.value,jwtToken:tok};
       var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('../../../../api/addrun'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
    
        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            var retTok = res.jwtToken;
    
            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Run has been added');
                storage.storeToken( {accessToken:retTok} );
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });

	};

    const searchRun = async event => 
    {
        event.preventDefault();
        		
        var tok = storage.retrieveToken();
        var obj = {userId:userId,search:search.value,jwtToken:tok};
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('../../../../api/searchruns'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
    
        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            var retTok = res.jwtToken;
    
            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                console.log(res)
                var runResults = res.results;
                var resultText = '';

                runResults.forEach( (runObject, index) => {
                    if ( (runObject.Run.toLowerCase()).includes( run.value.toLowerCase() ) )
                    {
                        console.log(runObject.Run)
                        // resultText += userObject.FullName + '\n';
                        
                    }
                    
                });

                setResults('Run(s) have been retrieved');
                // setRunList(resultText);
                storage.storeToken( {accessToken:retTok} );
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    };

    const searchUsers = async event => 
    {
        event.preventDefault();
        		
        var tok = storage.retrieveToken();
        var obj = {userId:userId,search:search.value,jwtToken:tok};
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('../../../../api/searchusers'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
    
        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            var retTok = res.jwtToken;

            console.log(response.data)
    
            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                var fullNameResults = res.results;
                var resultText = '';

                fullNameResults.forEach( (userObject, index) => {
                    if ( (userObject.FullName.toLowerCase()).includes( searchUserName.value.toLowerCase() ) )
                    {
                        console.log(userObject.FullName)
                        // resultText += userObject.FullName + '\n';
                        
                    }

                    
                    
                });
                setResults('User(s) have been retrieved');
                setRunList(resultText);
                storage.storeToken( {accessToken:retTok} );
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });

    };

    return(
        <div className="homepage-subsection" id="run-ui-div" style={{marginTop: "10px"}}>
        <br />

        <div className="input-field">
            <p id="runList">{runList}</p>
            <input type="text" className="search-run-text" id="run-text" placeholder="Search user" 
                ref={(c) => searchUserName = c} />
            <button type="button" className="search-run-buttons" id="addRunButton"
                onClick={searchUsers}> Search User </button><br />
            <span id="runAddResult">{message}</span>
        </div>

        <div className="input-field">
            <input type="text" className="search-run-text" id="search-text" placeholder="Run To Search For" 
                ref={(c) => search = c} />
            <button type="button" className="search-run-buttons" id="searchRunButton"
                onClick={searchRun}> Search Run</button><br />
            <span id="runSearchResult">{searchResults}</span>
        </div>
        <div className="input-field">
            <p id="runList">{runList}</p>
            <input type="text" className="search-run-text" id="run-text" placeholder="Run To Add" 
                ref={(c) => run = c} />
            <button type="button" className="search-run-buttons" id="addRunButton"
                onClick={addRun}> Add Run </button><br />
            <span id="runAddResult">{message}</span>
        </div>
        
        
        </div>
    );
}

export default RunUI;
