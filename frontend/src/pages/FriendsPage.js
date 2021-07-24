import React from 'react';

import RunPageNavbar from '../components/homepage/RunPageNavbar';
import Leaderboard from '../components/friends/Leaderboard';
import FriendsSection from '../components/friends/FriendsSection';
import RunUI from '../components/homepage/RunUI';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RunPage = () =>
{
    return(
        <Container className="page-container">
            <Row>
                <Col sm={12}>
                    <RunPageNavbar />
                </Col>

            </Row>

            <Row>
                <Col sm={6}>
                    <FriendsSection />
                </Col>
                <Col sm={6}>
                    <Leaderboard />
                </Col>
            </Row>
            {/* <Row>
                <RunUI />
            </Row> */}
        </Container>
    );
}

export default RunPage;
