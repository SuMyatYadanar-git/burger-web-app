import React from 'react'
import * as Colors from '../../../config/color.config'

const MenuCard = props => {
    const { title } = props
    return (
        <div className="container-fluid">
              
                    <div  className="py-0 px-4  w-100 " style={{ width: '100%',color:`${Colors.textBrown}` }}>
                        <p className='pb-4' style={{ fontWeight: 500, fontSize: 30, fontStyle: 'bold', textAlign: 'center', fontFamily: 'Volkhov' }}>{title}</p>
                        {props.children}
                    </div>
               
        </div>
    )
}
export default MenuCard;
