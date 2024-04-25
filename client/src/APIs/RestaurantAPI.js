import axios from 'axios'

export const url = axios.create({
    baseURL: "http://localhost:5001/restaurants",
})