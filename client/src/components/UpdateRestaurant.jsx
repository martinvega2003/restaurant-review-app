import React, { useEffect, useState } from 'react'

//IMPORTS DE LIBRERIAS:
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../APIs/RestaurantAPI'

const UpdateRestaurant = () => {
    const { id } = useParams() //HOOK de react-router-dom para obtener los params de la url.

    let navigate = useNavigate()

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")

    //No podemos fetchear la data de la context API pq haciendolo asi el usuario solo podra ver los campos rellenados si navega
    //en la pagina principal y luego le da a Update. Y no si va directamente a la url de Update.

    useEffect(() => {
        const fetchData = async () => {
            const res = await url.get(`/${id}`) //Usamos el id que obtuvimos con el useParams() hook.
            setName(res.data.data.restaurant.restaurant_name) 
            setLocation(res.data.data.restaurant.restaurant_location) 
            setPriceRange(res.data.data.restaurant.price_range) 
        } //Esta funcion lq hace es obtener un restaurante de acuerdo al id y setea los valores de name, location y priceRange de acuerdo
        //al valor que el restaurant tiene en la respuesta del fetching.

        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedRestaurant = await url.put(`/${id}`, {
            name,
            location,
            pricer: priceRange,
        })
        navigate('/')
    }

    
  return (
    <div className='p-4'>
      <form action=''>
        <div className='form-group mt-2'>
            <label htmlFor='name'>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} id='name' className='form-control' type='text' />
        </div>

        <div className='form-group mt-2'>
            <label htmlFor='location'>Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} id='location' className='form-control' type='text' />
        </div>

        <div className='form-group mt-2'>
            <label htmlFor='price_range'>Price Range</label>
            <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id='price_range' className='form-control' type='number' />
        </div>

        <div className='d-flex justify-content-center w-100 mt-2'>
            <button onClick={handleSubmit} type='submit' className='btn btn-primary w-25 p-2'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateRestaurant
