import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Review from "./Review";

const GetRecipe = () => {

  const [recipe, setRecipe] = useState({});
  const [review, setReview] = useState('');
  const [reviewsList, setReviewList] = useState([]);
  const [reviewAuthor, setReviewAuthor] = useState('');

  useEffect(() => {
    fetchRecipe();
    // getReviews();
    console.log('new recipe')
  }, []);

  const fetchRecipe = () => {
    fetch('/api/random')
      .then(rec => rec.json())
      .then((parsedRecipe) => {
        // console.log('parsed recipe in get recipe.jsx', parsedRecipe)
        setRecipe(parsedRecipe);
        setReviewList(parsedRecipe.reviews)
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
      // console.log('ingred', ingred);
    });
  }

  //maps the steps for display on the page
  const stepsArray = [];
  if (recipe.steps) {
    recipe.steps.forEach((step) => {
      stepsArray.push(<li>{step}</li>);
    });
  }

  const updateReview = (e) => {
    setReview(e.target.value);
    console.log(review)
  }

  const submitReview = (e) => {
    e.preventDefault();
    console.log(e.target)
    console.log('review body', e.target.reviewInput.value)
    console.log('review author', e.target.reviewAuthor.value)
    setReview(e.target.reviewInput.value);
    setReviewAuthor(e.target.reviewAuthor.value)
    console.log('review', review)
    console.log('reviewAuthor', reviewAuthor)
    const body = {
      review: review,
      name: reviewAuthor,
      id: recipe._id
    }
    console.log('body of review', body)
    fetch('/api/addReview', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    alert('Your review has been added! Thank you!')
    e.target.reviewInput.value = '';
    e.target.reviewAuthor.value = '';
        
  }

  const reviewDisplay = reviewsList ? reviewsList.map(review => {
    return <Review review={review}/>
  }) : '';

  
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
      <div>
        <form action="" id="addReview" onSubmit={submitReview}>
          <h3>Add A Review!</h3>
          <textarea name="" id="reviewInput" cols="30" rows="10" onInput={(e) => updateReview(e)} placeholder="Write review here!"></textarea>
          <input type="text" id="reviewAuthor" placeholder="What's your name?" onInput={(e) => setReviewAuthor(e.target.value)}/>
          <button type="submit" >Submit Review</button>
        </form>
      </div>
      <div className="review-container">
        {reviewDisplay}
      </div>
    </div>
    </div>
  )
}

export default GetRecipe;