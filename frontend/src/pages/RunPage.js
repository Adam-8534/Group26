import React from 'react';

import RunPageNavbar from '../components/homepage/RunPageNavbar';
import LoggedInName from '../components/homepage/LoggedInName';
import GettingStarted from '../components/homepage/GettingStarted';
import GetMobileApp from '../components/homepage/GetMobileApp';
import MapDemo from '../components/homepage/MapDemo';
import RunUI from '../components/homepage/RunUI';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

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
                <Col sm={4}>
                    <LoggedInName />
                    <GetMobileApp />
                </Col>
                <Col sm={8}>
                    <GettingStarted />
                    <MapDemo /> 
                </Col>
                
            </Row>
            {/* <Row>
                <RunUI />
            </Row> */}

        </Container>
            

    );
}

export default RunPage;
