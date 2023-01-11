import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div>
      <NavBar />
      <div className="home">
        <h1>Would you like to</h1>
        <button>
        <Link className="homeLink" to={'/addRecipe'}>Add a recipe</Link>
        </button>
        <h1>or</h1>
        <button><Link className="homeLink" to={'/getRecipe'}>Get a recipe</Link></button>
        <h1>?</h1>
      </div>
    </div>
  )
}

export default Home;