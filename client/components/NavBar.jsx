import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate();

  const handleSignOut = () => {
    fetch('/api/logout')
      .catch(err => console.log('Error logging out, ERROR: ', err));
      return navigate("/")
  }

  return (
    <div className="navbar">
      <h2>Welcome to Dining-In</h2>
      <Link className="navLink" to={'/getRecipe'}>Get Recipe</Link>
      <Link className="navLink" to={'/addRecipe'}>Add Recipe</Link>
      <Link className="navLink" to={'/home'}>Home</Link>
      <button onClick={handleSignOut}>Log Out</button>
    </div>
  )
}

export default NavBar;