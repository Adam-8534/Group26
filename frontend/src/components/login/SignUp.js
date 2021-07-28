import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SignUp = () => {
    return ( 
        <Row id="sign-up-div">
            <Col sm={6}>
                <a href="/register" id="sign-up-link">New here? Sign up</a>
            </Col>
            <Col sm={1}>
            </Col>
            <Col sm={5}>
                <a href="/forgotPassword" id="sign-up-link">Forgot password?</a>
            </Col>
            
        </Row>
     );
}
 
export default SignUp;