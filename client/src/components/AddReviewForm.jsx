import React, { useState } from 'react'
import { url } from '../APIs/RestaurantAPI'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const AddReviewForm = () => {

    //const location = useLocation() -> El hook useLocation te da acceso a la url que estas usando en ese momento. Esto nos sirve para obtener
    //el id del restaurante de la url. Pero por ahora solo usamos useParams()

    const navigate = useNavigate()

    const { id } = useParams()

    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("Rating")

    const handleSubmitReview = async () => {
        //e.preventDefault()
        try {
            const res = await url.post(`/${id}/add_review`, {
                nombre: name,
                review: reviewText,
                rating,
            }) //El objeto que pasamos como segundo parametro es el body del request.

            navigate('/')
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <div className='mb-2'>
      <form action=''>
        <div className="form row">
            <div className="form-group col-8">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" id='name' placeholder='nombre' className='form-control' />
            </div>

            <div className="form-group col-4">
                <label htmlFor="rating">Rating</label>
                <select value={rating} onChange={e => setRating(e.target.value)} id='rating' className='form-control'>
                    <option disabled>Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
        <div className="form-group mt-2">
            <label htmlFor="Review">Resena</label>
            <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} id='review' className='form-control'></textarea>
        </div>
        <div className="d-flex justify-right w-100">
            <button onClick={handleSubmitReview} className="btn btn-primary mt-2 w-50 pt-4 pb-4">
                Enviar
            </button>
        </div>
      </form>
    </div>
  )
}

export default AddReviewForm
