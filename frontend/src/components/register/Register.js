const Register = () => {
    return ( 
        <div id="login-div">
            <h1 id="register-title">Register new user</h1>
            <input type="text" className="login-input" id="lastName" placeholder="First Name" /><br />
            <input type="text" className="login-input" id="lastName" placeholder="Last Name" /><br />
            <input type="text" className="login-input" id="loginName" placeholder="Username" /><br />
            <input type="password" className="login-input" id="loginPassword" placeholder="Password" /><br />
            <input type="submit" id="login-button" className="buttons" value = "Register" /><br />
            {/* <span id="loginResult">{message}</span> */}
        </div>
     );
}
 
export default Register;