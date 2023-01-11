import React, { useEffect, useState } from "react";


const Review = ({review}) => {

  return (
    <div className="review-item">
      <h4>Review: </h4>
      <p>{review.body}</p>
      <h4>From:</h4>
      <p>{review.name}</p>
    </div>
  )
}

export default Review;