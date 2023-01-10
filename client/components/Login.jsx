import React from "react";
import NavBar from "./NavBar";

const Login = () => {

  return (
    <div>
      <NavBar />
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
    </div>
  )
}

export default Login;