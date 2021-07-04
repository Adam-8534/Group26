import React from 'react';

import RunPageNavbar from '../components/homepage/RunPageNavbar';
import LoggedInName from '../components/homepage/LoggedInName';
import RunUI from '../components/homepage/RunUI';

const RunPage = () =>
{
    return(
        <div className="page-container">
            <RunPageNavbar />
            <LoggedInName />
            <RunUI />
        </div>
    );
}

export default RunPage;
