import React from 'react'

const CardData = props => {
    const { menu, price, desc } = props
    return (
        <div className='py-3 '>
            <div className="d-flex align-items-center text-dark"
                style={{  fontFamily: 'Volkhov' }}>
                <h4 >{menu}</h4>
                <div style={{ flex: 1, borderBottom: '1px dotted black' }} />
                <h4>${price}</h4>
            </div>
            <h5>{desc}</h5>
          
        </div>
    )
}

export default CardData;