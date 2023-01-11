import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";

//custom hook for handling inputs
const useInput = init => {
  const [value, setValue] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  return [value, onChange];
};


const Login = () => {

  const [username, usernameOnChange] = useInput('');
  const [password, passwordOnChange] = useInput('');

  //function to handle click submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentUser = {
      username: username,
      password: password
    };
    console.log('current user', currentUser);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(currentUser)
    })
      .then(response => response.json())
      .then((parsedResponse) => {
        // console.log('parsed response in login', parsedResponse);
        // if (parsedResponse === false) {
        //   alert('Sorry that username or password is incorrect, please try again.')
        // } else {
          alert('logged in')
          return redirect("/home");
        // }
      })
      .catch(err => console.log('Error logging in, ERROR: ', err));
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <div className="input-field">
          <input type="text" name="username" id="username" placeholder="Enter Username" value={username} onChange={usernameOnChange} />
        </div>
        <div className="input-field">
          <input type="password" name="password" id="password" placeholder="Enter Password" value={password} onChange={passwordOnChange}/>
        </div>
        <input type="submit" value="LogIn" onClick={handleSubmit} />
      </form>
      <h3>Don't have an account with us yet?</h3>
      <Link className="loginLink" to={'/signup'}>Sign Up Here</Link>
    </div>
  )
}

export default Login;