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

const Signup = () => {

  const [username, usernameOnChange] = useInput('');
  const [password, passwordOnChange] = useInput('');

  //function to handle click submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      username: username,
      password: password
    };
    //FIX PATH BELOW!!!
    fetch('http://localhost:8080/api/???', {
      method: POST,
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then((parsedResponse) => {
        if (parsedResponse.newUser === false) {
          alert('Sorry that username or password is incorrect, please try again.')
        } else {
          return redirect("/home")
        }
      })
      .catch(err => console.log('Error adding new user, ERROR: ', err));
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
    <form>
        <div className="input-field">
          <input type="text" name="username" id="username" placeholder="Enter Username" value={username} onChange={usernameOnChange} />
        </div>
        <div className="input-field">
          <input type="password" name="password" id="password" placeholder="Enter Password" value={password} onChange={passwordOnChange}/>
        </div>
        <input type="submit" value="Sign Up" onClick={handleSubmit} />
      </form>
  <h3>Already have an account with us?</h3>
  <Link to={'/'}>Login Here</Link>
  </div>
  )
}

export default Signup;