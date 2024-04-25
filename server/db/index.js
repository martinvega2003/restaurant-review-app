import pkg from "pg";
const { Pool } = pkg

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "restaurant-review-app",
    password: "12345",
    port: 5432
}) //Creamos una instancia de Pool() (sirve para conectarnos a la BD)

// module.exports = {
//     query: (text, params) => pool.query(text, params) //Exportamos query.
// }

export default pool