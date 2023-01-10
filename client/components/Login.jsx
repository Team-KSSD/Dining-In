import React from "react";
import { Link } from "react-router-dom";

const Login = () => {

  return (
    <div>
      <form action="/user" method="post">
        <h2>Login</h2>
        <div className="input-field">
            <input type="text" name="username" id="username" placeholder="Enter Username" />
        </div>
        <div className="input-field">
            <input type="password" name="password" id="password" placeholder="Enter Password" />
        </div>
        <input type="submit" value="LogIn" />
    </form>
    <h2>Don't have an account with us yet?</h2>
    <Link to={'/signup'}>Sign Up Here</Link>
    </div>
  )
}

export default Login;