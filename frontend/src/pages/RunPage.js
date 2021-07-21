import React from 'react';

import RunPageNavbar from '../components/homepage/RunPageNavbar';
import LoggedInName from '../components/homepage/LoggedInName';
import GettingStarted from '../components/homepage/GettingStarted';
import RunUI from '../components/homepage/RunUI';

const RunPage = () =>
{
    return(
        <div className="page-container">
            <RunPageNavbar />
            <div className="homepage-section-container">
                <LoggedInName />
                <GettingStarted /> 
            </div>
            <RunUI />
        </div>
    );
}

export default RunPage;
