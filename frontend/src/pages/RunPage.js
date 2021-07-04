import React from 'react';

import RunPageNavbar from '../components/RunPageNavbar';
import LoggedInName from '../components/LoggedInName';
import RunUI from '../components/RunUI';

const RunPage = () =>
{
    return(
        <div>
            <RunPageNavbar />
            <LoggedInName />
            <RunUI />
        </div>
    );
}

export default RunPage;
