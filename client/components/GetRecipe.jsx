import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

const GetRecipe = () => {

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = () => {
    fetch('/api/random')
      .then(rec => rec.json())
      .then((parsedRecipe) => {
        console.log('parsed recipe in get recipe.jsx', parsedRecipe)
        setRecipe(parsedRecipe);
      })
      .catch(err => console.log('Error fetching random recipe, ERROR: ', err));
  }

  //get tags and format then push them to an array for display on the page
  const tagsArray = [];
  if (recipe.tag) {
    recipe.tag.forEach((element) => {
      tagsArray.push(<span>{element}</span>);
    })
  }

  //maps the ingredients for display on the page
  const ingredientsArray = [];
  if (recipe.ingredients) {
    recipe.ingredients.forEach((ingred) => {
      ingredientsArray.push(<li>{ingred.item}: {ingred.quantity} {ingred.unit}</li>)
      console.log('ingred', ingred);
    });
  }

  //maps the steps for display on the page
  const stepsArray = [];
  if (recipe.steps) {
    recipe.steps.forEach((step) => {
      stepsArray.push(<li>{step}</li>);
    });
  }

  return (
    <div>
      <NavBar />
      <div className="getRecipe">
      <h2>Looking for something to make tonight?</h2>
      <button onClick={fetchRecipe}>New random recipe</button>
      <div className="recipeCard">
        <h2>{recipe.recipeName}</h2>
        <h3>Submitted By: {recipe.author}</h3>
        <h3>Time to Cook: {recipe.cookTime} minutes</h3>
        <h3>Tags: {tagsArray}</h3>
        <h3>Difficulty Level: {recipe.difficulty}</h3>
        <h3>Ingredients:</h3>
        <ul>
          {ingredientsArray}
        </ul>
        <h3>Steps:</h3>
        <ol>
          {stepsArray}
        </ol>
      </div>
    </div>
    </div>
  )
}

export default GetRecipe;