import React from "react";

const Signup = () => {

  return (
    <div>
    <form action="/user" method="post">
      <h2>Sign Up</h2>
      <div className="input-field">
          <input type="text" name="username" id="username" placeholder="Enter Username" />
      </div>
      <div className="input-field">
          <input type="password" name="password" id="password" placeholder="Enter Password" />
      </div>
      <input type="submit" value="Sign Up" />
  </form>
  <h2>Already have an account with us?</h2>
  <Link to={'/login'}>Login Here</Link>
  </div>
  )
}

export default Signup;