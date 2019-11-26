import React, { useState, useEffect } from 'react'

import Carousel from '../components/Carousel'
import CardItem1 from '../components/cardItem1'
import SingleItem from '../components/singleItem'

import { getAllCategory } from '../../../network/categoryFetcher'
import { get } from 'http'

// import BurgerInfo from '../components/BurgerInfo'

const HomeContainer = props => {

    const [category, setCategory] = useState([])

    useEffect(() => {
        getAllCategory((error, data) => {
            if (error != null) console.error(error)
            else setCategory(data)
        })
    }, [])

    return (
        <div className="container-0 text-center" >
            <Carousel />

            <CardItem1 category={category} />

            <SingleItem />
            {/* <BurgerInfo /> */}
        </div>
    )
}

export default HomeContainer