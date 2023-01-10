import React from "react";
import NavBar from "./NavBar";

const AddRecipe = () => {

  const submit = (event) => {
    event.preventDefault();
    const recipeToAdd = {
      //fill in the data to post
    }
    .then(() => {
      fetch('http://localhost:3000/api/addRecipe', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recipeToAdd)
      })
    })
  }

  return (
    <div>
      <NavBar />
      <h2>This is the add recipe page</h2>
      <form onSubmit={submit}>
        <input type="text" id="recipeName" placeholder="Enter the recipe name"></input>
        <input type="text" id="author" placeholder="Enter your name"></input>
      </form>
    </div>
  )
}

export default AddRecipe;