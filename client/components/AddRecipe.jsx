import React, { useState } from "react";
import NavBar from "./NavBar";

const AddRecipe = () => {

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [numOfIngredients, setNumOfIngredients] = useState(2);
  const [numOfSteps, setNumOfSteps] = useState(2);

  //submitting the form and creating a post request
  const submit = (event) => {
    event.preventDefault();
    const ingredients = [];
    for(let i = 0; i < numOfIngredients; i++) {
      //currently works when more than one ingredient is put in
      //need to fix for when there is just one ingredient
      const nextIngredient = new Ingredient(
        event.target.quantity[i].value,
        event.target.unit[i].value,
        event.target.item[i].value
      )
      ingredients.push(nextIngredient);
    }

    const steps = [];
    for(let i = 0; i < numOfSteps; i++) {
      const nextStep = event.target.step[i].value;
      steps.push(nextStep);
    }

    const recipeToAdd = {
      recipeName: event.target.recipeName.value,
      author: event.target.author.value,
      cookTime: event.target.cookTime.value, 
      tag: selectedTags,
      difficulty: selectedDifficulty,
      ingredients: [...ingredients],
      steps: [...steps]
    }

    fetch('/api/addRecipe', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipeToAdd)
    })
    .then(() => {
      alert('Your recipe has been submitted! Thanks for your contribution :)')
    })
    .then(() => {
      window.location.reload();
    })
  }

  //selecting the tags
  const handleCheck = (event) => {
    if(event.target.checked) {
      currentSelectedTags = [...selectedTags, event.target.value]
    } else {
      currentSelectedTags.splice(selectedTags.indexOf(event.target.value), 1);
    }
    setSelectedTags(currentSelectedTags);
  }
  
  let currentSelectedTags = [];
  const tagOptions = ['Gluten Free', 'Vegetarian', 'Vegan', 'Family Secret']
  const tags = [];
  tagOptions.forEach((tag) => {
    tags.push(
      <div>
        <label><input value={tag} key={tag} type="checkbox" onChange={handleCheck}/><span>{tag}</span></label>
      </div>
    )
  })
  
  //selecting the difficulty
  const handleSelect = (event) => {
    setSelectedDifficulty(event.target.value);
  }

  const difficultOptions = ['So Easy!', 'A little hard but not bad', 'Kinda advanced', 'You gotta be bold to try']
  const difficulty = [];
  difficultOptions.forEach((option) => {
    difficulty.push(
      <div>
        <label><input value={option} name="difficulty" type="radio" onChange={handleSelect}/><span>{option}</span></label>
      </div>
    )
  })

  //adding ingredients
  class Ingredient {
    constructor(quantity, unit, item) {
      this.quantity = quantity;
      this.unit = unit;
      this.item = item;
    }
  }

  let gettingIngredients = []
  for(let i = 0; i < numOfIngredients; i++) {
    gettingIngredients.push(
      <div>
        <input type="text" id="quantity" placeholder="Enter the quantity of this ingredient" required></input>;
        <input type="text" id="unit" placeholder="Enter the unit for this ingredient" required></input>;
        <input type="text" id="item" placeholder="Enter the name of this ingredient" required></input>;
      </div>
    )
  }
  
  //adding steps
  const gettingSteps = [];
  for(let i = 0; i < numOfSteps; i++) {
    gettingSteps.push(
      <div>
        <input type="text" id="step" placeholder={`Enter info for step #${i+1}`} required></input>
        <br></br>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <h2>Add your recipe!</h2>
      <form onSubmit={submit}>
        <input type="text" id="recipeName" placeholder="Enter the recipe name" required></input><br></br>
        <input type="text" id="author" placeholder="Enter your name" required></input><br></br>
        <input type="number" id="cookTime" placeholder="Enter the approximate total cook time in minutes" required></input><br></br>
        <h4>Select all of the following that apply</h4>
        {tags}
        <h4>Select the difficulty level</h4>
        {difficulty}
        {gettingIngredients}
        <button type="button" onClick={() => {setNumOfIngredients(numOfIngredients + 1)}}>Click here to add another ingredient</button>
        //steps
        {gettingSteps}
        <button type="button" onClick={() => {setNumOfSteps(numOfSteps + 1)}}>Click here to add another step</button>
        <input type="submit" value="Submit!"></input>
      </form>
    </div>
  )
}

export default AddRecipe;