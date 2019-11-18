import React from 'react'
import BurgerCard from '../components/burgerCard'

const BurgerContainer = props => {
    return (
        <div className="container-fluid py-5 bg-light" >
            <BurgerCard />
        </div>
    )
}

export default BurgerContainer