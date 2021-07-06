const Register = () => {
    return ( 
        <div id="login-div">
            <h1 id="register-title">Register new user</h1>

            <div id="registerNames">
                <input type="text" className="register-input" id="registerFirstName" placeholder="First Name" />
                <input type="text" className="register-input" id="registerLastName" placeholder="Last Name" /><br />
            </div>

            <input type="text" className="register-input" id="registerEmail" placeholder="Email" /><br />
            <input type="text" className="register-input" id="registerUsername" placeholder="Username" /><br />
            <input type="password" className="register-input" id="registerPassword" placeholder="Password" /><br />
            <input type="submit" id="login-button" className="buttons" value = "Register" /><br />
            {/* <span id="loginResult">{message}</span> */}
        </div>
     );
}
 
export default Register;