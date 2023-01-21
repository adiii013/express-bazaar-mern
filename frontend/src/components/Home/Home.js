import React, { Fragment } from 'react'
import './Home.css'

//! Component
import Product from './Product'

//! Icons
import {CgMouse} from 'react-icons/cg'

const product = {
    name:"Blue Shirt",
    price:100,
    image:[{url:"https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48="}],
    _id:"aditya"
}


function Home() {
  return (
    <Fragment>
    <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
            <button>Scroll <CgMouse/> </button>
        </a>
    </div>
    <h2 className="homeHeading">Featured Products</h2>
    <div className="container" id="container">
        <Product product={product}/>
    </div>
    </Fragment>
  )
}

export default Home