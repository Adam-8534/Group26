import React from 'react';

import RunPageNavbar from '../components/homepage/RunPageNavbar';
import Leaderboard from '../components/friends/Leaderboard';
import FriendsSection from '../components/friends/FriendsSection';

const RunPage = () =>
{
    return(
        <div className="page-container">
            <RunPageNavbar />
            <div className="page-container-flex">
                <div className="side-by-side-container">
                    <FriendsSection />
                </div>
                <div className="side-by-side-container">
                    <Leaderboard />
                </div>
            </div>
        </div>
    );
}

export default RunPage;
