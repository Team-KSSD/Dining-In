import React from "react";
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {

  return (
    <div className="navbar">
      <h2>Welcome to Dining-In</h2>
        <Link to={'/'}>Login</Link>
        <Link to={'/signup'}>Sign Up</Link>
        <Link to={'/getRecipe'}>Get Recipe</Link>
        <Link to={'/addRecipe'}>Add Recipe</Link>
    </div>
  )
}

export default NavBar;