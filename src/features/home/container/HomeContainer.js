import React from 'react'

import Carousel from '../components/Carousel'
import CardItem1 from '../components/cardItem1'
import SingleItem from '../components/singleItem'

// import BurgerInfo from '../components/BurgerInfo'

const HomeContainer = props => {
    return (
        <div className="container-0 text-center" >
            <Carousel />

            <CardItem1 />

            <SingleItem />
            {/* <BurgerInfo /> */}
        </div>
    )
}

export default HomeContainer