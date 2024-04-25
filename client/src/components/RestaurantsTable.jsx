import React, {useContext, useEffect} from 'react'

//IMPORTS DE LA APIS:
import { url } from '../APIs/RestaurantAPI'
import { RestaurantsContext } from '../context/RestaurantsContext'

//IMPORTS DE LIBRERIAS:
import { useNavigate } from 'react-router-dom'
import StarsRating from './StarsRating'

const RestaurantsTable = ({}) => {

    let navigate = useNavigate() //useNavigate se usa para redireccionar al usuario a otra url.

    const {restaurants, setRestaurants} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await url.get("/")
                setRestaurants(res.data.data.restaurants)
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchData()
    }, [])

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`)
    }

    const handleDelete = async (ev, id) => {
        ev.stopPropagation() //Evitar que al hacer click en el boton ejecute el evento de click en la tablerow
        try {
            const res = url.delete(`/${id}`) //Se guarda la respuesta
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id;
            }))
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleUpdate = async (ev, id) => {
        ev.stopPropagation()
        try {
            navigate(`/restaurants/${id}/update`)
        } catch (error) {
            console.error(error.message)
        }
    }

    const renderRating = (restaurant) => { //Funcion para renderizar la data de rating de un restaurante

        if (!restaurant.count) {
            return (
                <span className='text-warning'>
                    0 reviews
                </span>
            )
        }

        return (
            <>
                <StarsRating rating={restaurant.id} />
                <span className='text-warning m-2'>({restaurant.count})</span>
            </>
        )
    }

  return (
    <div className='list-group p-4'>
        <table class="table table-hover table-dark table-striped p-4">
            <thead>
                <tr className='bg-primary'>
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>

                {
                    restaurants && restaurants.map(r => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(r.id)} key={r.id}>
                                <td>{r.restaurant_name}</td>
                                <td>{r.restaurant_location}</td>
                                <td>{"$".repeat(r.price_range)}</td>
                                <td>{renderRating(r)}</td>
                                <td><button onClick={(e) => handleUpdate(e, r.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={(e) => handleDelete(e, r.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })
                }

                {/* <tr>
                    <td>Mcdonalds</td>
                    <td>Asuncion</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>

                <tr>
                    <td>Mcdonalds</td>
                    <td>Asuncion</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>

                <tr>
                    <td>Mcdonalds</td>
                    <td>Asuncion</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantsTable
