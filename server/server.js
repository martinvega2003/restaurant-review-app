import express from 'express'
import morgan from 'morgan'
import pool from './db/index.js'
import cors from 'cors'

//Creamos el server:
const App = express()
const port = process.env.PORT || 5001 //5001 es el valor por defecto.

//MIDDLEWARES:

//Morgan:
App.use(morgan("dev"))

App.use((req, res, next) => {
    console.log("middleware working")
    next() //next() es necesario para que el programa pase al siguiente middleware (Siempre que coincida con la url solicitada por el cliente) y se dentendra cuando ya no haya next().
})

App.use(cors()) //middleware para que el front end pueda recibir data de APIs de otro dominio (otro localhost port)
App.use(express.json()) //Middleware para que se pueda usar el formato json en la respuesta.

//RUTAS:

//GET Para todos los restaurantes:
App.get('/restaurants', async (req, res) => {
    try {
        //const results = await pool.query("SELECT * FROM restaurants")

        const restaurantRatingsData = await pool.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT (*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id")
        //La query de arriba es para hacer un JOIN de las tablas restaurants y reviews y obtener tambien los ratings que tiene cada restaurante y el valor average de los ratings para cada restaurante. Asi tenemos todo en una sola tabla.
        console.log(restaurantRatingsData.rows)
        res.status(200).json({
            status: "succes",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows
            }
        })
    } catch (error) {
        console.error(error.message)
    }
})

//GET Para un solo restaurante:
App.get('/restaurants/:id', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT (*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE id=$1",
        [req.params.id]) //Seleccionamos un restaurante con el id=req.params.id

        const resultReviews = await pool.query("SELECT * FROM reviews WHERE restaurant_id=$1",
        [req.params.id]) //Tambien tenemos que seleccionar todas las reviews de ese restaurante llamadno a la tabla reviews
        //y obteniendo los registros que tengan la foreign key igual al id del restaurante que llamamos al principio.

        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0],
                reviews: resultReviews.rows //Usamos 'rows' pq se pasan todass las reviewss, no una especifica.
            }
        })
    } catch (error) {
        console.error(error.message)
    }
})

//POST para crear un restaurante:
App.post('/restaurants', async (req, res) => {
    console.log(req.body)
    try {
        const result = await pool.query("INSERT INTO restaurants (restaurant_name, restaurant_location, price_range) VALUES($1, $2, $3) RETURNING *",
        [req.body.name, req.body.location, req.body.pricer])

        res.status(201).json({
            status: "sucess",
            data: {
                restaurant: result.rows[0]
            }
        })
    } catch (error) {
        console.error(error.message)
    }
})

//PUT para actualizar un restaurante:
App.put('/restaurants/:id', async (req, res) => {
    try {
        const result = await pool.query("UPDATE restaurants SET restaurant_name=$1, restaurant_location=$2, price_range=$3 WHERE id=$4 RETURNING *",
        [req.body.name, req.body.location, req.body.pricer, req.params.id])
        //req.params para obtener valores de la url, req.body para obtener valores del cuerpo de la request que envia el cliente al servidor a traves del metodo http

        res.status(200).json({
            status: "sucess",
            data: {
                restaurant: result.rows[0]
            }
        })
    } catch (error) {
        console.error(error.message)
    }
})

//DELETE para borrar un restaurante:
App.delete('/restaurants/:id', async (req, res) => {
    try {
        const result = pool.query("DELETE FROM restaurants WHERE id=$1",
        [req.params.id])
        res.status(204).json({
            status: "sucess"
        })
    } catch (error) {
        console.error(error.message)
    }
})


//RUTAS PARA LA TABLA DE REVIEWS:
//--------------------------------------------------------------------




//POST para anadir una review:

App.post('/restaurants/:id/add_review', async (req, res) => {
    try {
        const result = await pool.query(
            "INSERT INTO reviews (restaurant_id, nombre, review, rating) VALUES($1, $2, $3, $4) RETURNING *", 
            [req.params.id, req.body.nombre, req.body.review, req.body.rating]
        )

        console.log(result)

        res.status(201).json({ //Definimos el status de la res (numero) en un formato json
            status: "sucess", //Establecemos que la peticion fue exitosa
            data: {
                review: result.rows[0] //retornamos data (result guarda la data, en rows se encuentra lq queremos de la BD)
            }
        })
    } catch (error) {
        console.error(error.message)
        
    }
})


//INICIALIZAMOS EL SERVIDOR:
App.listen(port, () => {
    console.log("Server is running on port 5000")
})