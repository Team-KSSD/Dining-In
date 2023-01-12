import React, { useEffect, useState } from "react";


const Review = ({review}) => {

  return (
    <div className="review-item">
      {/* <h4>Review: </h4> */}
      <p className="review-body">{review.body}</p>
      <p className="review-name">- {review.name}</p>
    </div>
  )
}

export default Review;