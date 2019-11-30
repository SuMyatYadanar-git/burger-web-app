import React, { useState, useEffect } from 'react'
import BurgerCard from '../components/burgerCard'

import { getAllProduct } from '../../../network/productFetcher'

const BurgerContainer = props => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        getAllProduct((error, data) => {
            if (error != null) console.error(error)
            else setProduct(data)
          
        })
    }, [])

    return (
        <div className="container-fluid py-5 bg-light" >
            <BurgerCard product={product} />
        </div>
    )
}

export default BurgerContainer