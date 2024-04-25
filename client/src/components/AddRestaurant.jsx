import React, { useContext, useState } from 'react'
import '../components-styles/AddRestaurant.css'

// IMPORTS DE LAS APIS:
import { url } from '../APIs/RestaurantAPI'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {

    const { addRestaurant } = useContext(RestaurantsContext)

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await url.post("/", {
                name,
                location,
                pricer: priceRange,
            })
            addRestaurant(res.data.data.restaurant)
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <div className='mb-4 p-4'>
      <form action='' onSubmit={e => e.preventDefault()}>
        <div className='form row'>
            <div className="col">
                <input value={name} onChange={e => setName(e.target.value)} type="text" className='form-control' placeholder='name' />
            </div>
            <div className="col">
                <input value={location} onChange={e => setLocation(e.target.value)} type="text" className='form-control' placeholder='location' />
            </div>
            <div className="col">
                <select placeholder='Price Range' value={priceRange} onChange={e => setPriceRange(e.target.value)} type="text" className='col w-100 h-200 custom select my-1 mr sm-2'>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>
            <button onClick={handleSubmit} type='submit' className='col btn btn-primary'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
