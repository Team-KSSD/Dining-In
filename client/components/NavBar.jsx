import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <div className="navbar">
      <h2>Welcome to Dining-In</h2>
        <Link className="navLink" to={'/getRecipe'}>Get Recipe</Link>
        <Link className="navLink" to={'/addRecipe'}>Add Recipe</Link>
        <Link className="navLink" to={'/home'}>Home</Link>
    </div>
  )
}

export default NavBar;