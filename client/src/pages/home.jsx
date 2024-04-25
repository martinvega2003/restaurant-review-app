import React from 'react'
import '../pages-style/home.css'

// IMPORTS DE COMPONENTES:
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantsTable from '../components/RestaurantsTable'

const Home = () => {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantsTable />
    </div>
  )
}

export default Home
