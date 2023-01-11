import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div>
      <NavBar />
      <h1>Would you like to</h1>
      <Link to={'/addRecipe'}>Add a recipe</Link>
      <h2>or</h2>
      <Link to={'/getRecipe'}>Get a recipe?</Link>
    </div>
  )
}

export default Home;