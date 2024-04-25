import React, { useContext, useEffect } from 'react'
import '../pages-style/restaurantDetails.css'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { url } from '../APIs/RestaurantAPI'
import StarsRating from '../components/StarsRating'
import ReviewsCard from '../components/ReviewsCard'
import AddReviewForm from '../components/AddReviewForm'

const RestaurantDetails = () => {

  const {id} = useParams()
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

  useEffect(() => { //useEffect para fetchear data del backend
    const fetchData = async () => { //Creamos la funcion
      const res = await url.get(`/${id}`) //Especificamos la url y hacemos el fetching
      setSelectedRestaurant(res.data.data) //Seteamos el 'selectedRestaurant' al valor de la respuesta. Usamos data.data pq queremos obtener tanto el restaurante como las reviews.
      //Lo que guardamos en este estado es un objeto con keys restaurant (Que tiene los datos del restaurante) y reviews (Que tiene los datos de las reviews)
    }

    fetchData() //Ejecutamos la funcion.
  }, [])

  const calcPromReviews = (reviews) => { //Funcion para calcular el promedio de resenas

    let sumaReviews = 0

    reviews.forEach(review => {
      sumaReviews += review.rating
    })
  
    return sumaReviews / reviews.length
  }

  const rating = selectedRestaurant && calcPromReviews(selectedRestaurant.reviews) || 0

  return (
    <div>
      {
        selectedRestaurant && (
          <>
            <h2 className='w-100 m-2 mt-4 text-center display-1'>
              {
                selectedRestaurant.restaurant.restaurant_name
              }
            </h2>
            <div className="w-100 d-flex justify-content-center align-items-center m-4">
              <StarsRating rating={rating} />
              {
                <div className='text-warning m-2'>
                  {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
                </div>
              }
            </div>
            <div className="mt-3 p-4">
              <ReviewsCard reviews={selectedRestaurant} />
              <AddReviewForm />
            </div>
          </>
        )
      }
    </div>
  )
}

export default RestaurantDetails
