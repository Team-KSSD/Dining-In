import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <div className="navbar">
      <h2>Welcome to Dining-In</h2>
        <Link to={'/getRecipe'}>Get Recipe</Link>
        <Link to={'/addRecipe'}>Add Recipe</Link>
        <Link to={'/home'}>Home</Link>
    </div>
  )
}

export default NavBar;