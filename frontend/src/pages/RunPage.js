import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import RunUI from '../components/RunUI';

const RunPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <RunUI />
        </div>
    );
}

export default RunPage;
