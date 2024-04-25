import React from 'react'

const StarsRating = ({rating}) => { //Pasamos el numero rating como props (de 1 a 5)

    const stars = [] //Creamos un array vacio
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) { //Comprobamos que el valor actual de i sea menor o igual a rating, y si es true...
            stars.push(<i key={i} className='fas fa-star text-warning'></i>) //Agregamos un icono de estrella completa al array
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) { //Comprobamos que sea un decimal cercano al valor de i
            stars.push(<i key={i} className='fas fa-star-half-alt text-warning'></i>)
        } else {
            stars.push(<i key={i} className='far fa-star text-warning'></i>) //Si el numero actual es mayor al rating, se le agrega una estrella vacia.
        }
    }

  return ( //Retornamos solo el array de estrellas con los iconos correspondientes.
    <>
        {stars}
    </>
  )
}

export default StarsRating
