import React from 'react'
// import { CgMouse } from "react-icons"
import './Home.css'
import Product from '../Products'
const Home:React.FC= () => {
  return (
    <>
    <div className='banner'>
        <p>Welcome To Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW </h1>
        <a href='#container'>
            <button>
                Scroll 
            </button>
        </a>
    </div>
    <h2 className='homeHeading'>Featured Products</h2>
    <div className='container ' id ='container'>
    <Product product={product}/>
    </div>
    </>
  )
}

export default Home