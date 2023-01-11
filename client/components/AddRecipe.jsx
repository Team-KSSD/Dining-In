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
  const fakeIngredients = ['meat', 'sour cream', 'flour', 'cheerios', 'peanut butter', 'avocados', 'bread', 'cucumber', 'salt', 'oregano']
  const fakeUnits = ['cups', 'tsp', 'tb', 'dash', 'gallons', 'liters', 'hand fulls', 'spritzes', 'milliliters', 'packed cups']
  for(let i = 0; i < numOfIngredients; i++) {
    gettingIngredients.push(
      <div>
        <input type="text" id="quantity" placeholder={`Quantity (ex: ${Math.floor(Math.random()*10)})`} required></input>;
        <input type="text" id="unit" placeholder={`Unit (ex: ${fakeUnits[Math.floor(Math.random()*10)]})`} required></input>;
        <input type="text" id="item" placeholder={`Name (ex: ${fakeIngredients[Math.floor(Math.random()*10)]})`} required></input>;
      </div>
    )
  }
  
  //adding steps
  const gettingSteps = [];
  for(let i = 0; i < numOfSteps; i++) {
    gettingSteps.push(
      <div>
        <input type="text" id="step" placeholder={`Step #${i+1}`} required></input>
        <br></br>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="addRecipe">
        <h2>This is the add recipe page</h2>
        <form onSubmit={submit}>
          <h4 className="header">The basics</h4>
          <input type="text" id="recipeName" placeholder="Recipe name" required></input><br></br>
          <input type="text" id="author" placeholder="Your name" required></input><br></br>
          <input type="number" id="cookTime" placeholder="Total cook time (mins)" required></input><br></br>
          <h4 className="header">Select all of the following that apply</h4>
          {tags}
          <h4 className="header">Select the difficulty level</h4>
          {difficulty}
          <h4 className="header">Enter the ingredients for your dish</h4>
          {gettingIngredients}
          <button type="button" onClick={() => {setNumOfIngredients(numOfIngredients + 1)}}>Add another ingredient</button>
          <h4 className="header" id="stepsHeader">Enter the steps to create your dish</h4>
          {gettingSteps}
          <button type="button" onClick={() => {setNumOfSteps(numOfSteps + 1)}}>Add another step</button><br></br>
          <input className="submitButton" type="submit" value="Submit!"></input>
        </form>
      </div>
    </div>
  )
}

export default AddRecipe;

// import React, { useState } from "react";
// import NavBar from "./NavBar";

// const AddRecipe = () => {

//   const [selectedTags, setSelectedTags] = useState([]);
//   const [selectedDifficulty, setSelectedDifficulty] = useState('');
//   const [numOfIngredients, setNumOfIngredients] = useState(1);
//   const [numOfSteps, setNumOfSteps] = useState(1);
//   const [ingredients, setIngredients] = useState([]);
//   const [steps, setSteps] = useState([]);

//   //submitting the form and creating a post request
//   const submit = (event) => {
//     event.preventDefault();
//     createIngredientsList(gettingIngredients);
//     createStepsList(gettingSteps);
//     const recipeToAdd = {
//       recipeName: event.target.recipeName,
//       author: event.target.authore,
//       cookTime: event.target.cookTime, 
//       tag: [...selectedTags],
//       difficulty: selectedDifficulty,
//       ingredients: [...ingredients],
//       steps: [...steps]
//     }
//     // .then(() => {
//     //   fetch('http://localhost:3000/api/addRecipe', {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json"
//     //     },
//     //     body: JSON.stringify(recipeToAdd)
//     //   })
//     // })
//     console.log('yay fam we in here doin it')
//     console.log('recipeToAdd', recipeToAdd)
//   }

//   //helper function to set ingredients and steps when submit button is pressed
//   const createIngredientsList = (gettingIngredients) => {
//     gettingIngredients.forEach((ingred) => {
//       const nextIngredient = new Ingredient(
//         event.target.gettingIngredients.quantity, 
//         event.target.gettingIngredients.unit, 
//         event.target.gettingIngredients.item
//       )
//       setIngredients(...ingredients, nextIngredient)
//     })
//   }

//   const createStepsList = (gettingSteps) => {
//     gettingSteps.forEach((step) => {
//       setSteps([...steps, event.target.gettingSteps.value]);
//     })
//   }

//   //selecting the tags
//   const handleCheck = (event) => {
//     if(event.target.checked) {
//       currentSelectedTags = [...selectedTags, event.target.value]
//     } else {
//       currentSelectedTags.splice(selectedTags.indexOf(event.target.value), 1);
//     }
//     setSelectedTags(currentSelectedTags);
//   }
  
//   const currentSelectedTags = [];
//   const tagOptions = ['Gluten Free', 'Vegetarian', 'Vegan', 'Family Secret']
//   const tags = [];
//   tagOptions.forEach((tag) => {
//     tags.push(
//       <div>
//         <label><input value={tag} key={tag} type="checkbox" onChange={handleCheck}/><span>{tag}</span></label> //both span and label necessary?
//       </div>
//     )
//   })
  
//   //selecting the difficulty
//   const handleSelect = (event) => {
//     setSelectedDifficulty(event.target.value);
//   }

//   const difficultOptions = ['So Easy!', 'A little hard but not bad', 'Kinda advanced', 'You gotta be bold to try']
//   const difficulty = [];
//   difficultOptions.forEach((option) => {
//     difficulty.push(
//       <div>
//         <label><input value={option} name="difficulty" type="radio" onChange={handleSelect}/><span>{option}</span></label>
//       </div>
//     )
//   })

//   //adding ingredients
//   class Ingredient {
//     constructor(quantity, unit, item) {
//       this.quantity = quantity;
//       this.unit = unit;
//       this.item = item;
//     }
//   }

//   const gettingIngredients = []
//   for(let i = 0; i < numOfIngredients; i++) {
//     gettingIngredients.push(
//       <div>
//         <input type="text" id="quantity" placeholder="Enter the quantity of this ingredient" required></input>;
//         <input type="text" id="unit" placeholder="Enter the unit for this ingredient" required></input>;
//         <input type="text" id="item" placeholder="Enter the name of this ingredient" required></input>;
//       </div>
//     )
//   }
  
//   //adding steps
//   const gettingSteps = [];
//   for(let i = 0; i < numOfSteps; i++) {
//     gettingSteps.push(
//       <input type="text" id={`Step ${i+1}`} placeholder={`Enter info for step #${i+1}`} required></input>
//     )
//   }

//   return (
//     <div>
//       <NavBar />
//       <h2>Add your recipe!</h2>
//       <form onSubmit={submit}>
//         <input type="text" id="recipeName" placeholder="Enter the recipe name" required></input><br></br>
//         <input type="text" id="author" placeholder="Enter your name" required></input><br></br>
//         <input type="number" id="cookTime" placeholder="Enter the approximate total cook time in minutes" required></input><br></br>
//         <h4>Select all of the following that apply</h4>
//         {tags}
//         <h4>Select the difficulty level</h4>
//         {difficulty}
//         {ingredients}
//         <button type="button" onClick={() => {setNumOfIngredients(numOfIngredients + 1)}}>Click here to add another ingredient</button>
//         {steps}
//         <button type="button" onClick={() => {setNumOfSteps(numOfSteps + 1)}}>Click here to add another step</button>
//         <input type="submit" value="Submit!"></input>
//       </form>
//     </div>
//   )
// }

// export default AddRecipe;