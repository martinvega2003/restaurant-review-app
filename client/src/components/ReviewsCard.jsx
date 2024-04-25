import React from 'react'
import StarsRating from './StarsRating'

const ReviewsCard = ({reviews}) => {
  return (
    <div className='row row-cols-3 mb-2'>

        {
            reviews.reviews.map(review => {
                return (
                        <div key={review.id} className="card text-white bg-primary m-2" style={{maxWidth: "30%"}}>
                            <div className="card-header d-flex justify-content-between">
                                <span>{review.nombre}</span>
                                <span>
                                    <StarsRating rating={review.rating} />
                                </span>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    {review.review}
                                </p>
                            </div>
                        </div>
                )
            })
        }

    </div> 
  )
}

export default ReviewsCard
