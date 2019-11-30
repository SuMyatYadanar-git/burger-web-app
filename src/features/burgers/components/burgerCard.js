import React from 'react'
import { withMedia } from 'react-media-query-hoc'

import * as Colors from '../../../config/color.config'
import './burger.css'
import { IMG_SERVER } from '../../../network/api'

const BurgerCard = props => {
    const { media, product } = props
    if (product.lenght === 0) return null;
    // const arrayReverse = ProductDetail.sort((a, b) => parseFloat(b.id) - parseFloat(a.id))
    const arrayReverse = product.sort((a, b) => parseFloat(b.id) - parseFloat(a.id))
    return (

        <div className='container '>
            <div className='text-center'>
                <div className='px-5 py-4' style={{ color: `${Colors.textBrown}`, fontFamily: 'Volkhov', }}>
                    <span className="font-weight-bold" style={{ fontSize: media.desktop ? 35 : media.tablet ? 25 : 20 }}>The Best From Our Offer</span>
                    <p style={{ fontWeight: 'lighter', fontSize: media.desktop ? 25 : media.tablet ? 17 : 15 }}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
             nibh euismod tincidunt ut laoreet dolore magna aliquam
                   </p>
                </div>

                <div className='d-flex flex-row flex-wrap justify-content-center '>
                    {/* process.env.PUBLIC_URL + */}
                    {arrayReverse.map((v,k) =>
                        <div className='col-lg-4 ' key={k}>
                            <div className='p-3 py-4 h-100' style={{ background: Colors.white, borderRadius: 5, fontFamily: 'Volkhov' }}>
                                <img className='img-fluid img-con' src={IMG_SERVER + '/uploads/' + `${v.p_img}`} alt='BurgerImage' />
                                <div className="pt-4">  <h1 style={{ color: `${Colors.Price}`, }}>{v.p_price}</h1> </div>
                                <h3 style={{ color: `${Colors.textBrown}`, fontWeight: 'bold' }}>{v.p_name}</h3>
                                <span style={{ fontSize: media.desktop ? 18 : media.tablet ? 14 : 13 }}>{v.description}</span>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>

    )
}

export default withMedia(BurgerCard)

const ProductDetail = [
    {
        id: 1,
        name: 'Standard1',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger1.jpg'
    },
    {
        id: 2,
        name: 'Standard2',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger2.jpg'
    },
    {
        id: 3,
        name: 'Standard3',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger3.jpg'
    },
    {
        id: 4,
        name: 'Standard4',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger4.jpg'
    },
    {
        id: 5,
        name: 'Standard5',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger5.jpg'
    },
    {
        id: 6,
        name: 'Standard6',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger6.jpg'
    },
    {
        id: 5,
        name: 'Standard5',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger5.jpg'
    },
    {
        id: 6,
        name: 'Standard6',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger6.jpg'
    },
    {
        id: 5,
        name: 'Standard5',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger5.jpg'
    },
    {
        id: 6,
        name: 'Standard6',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger6.jpg'
    },
    {
        id: 5,
        name: 'Standard5',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger5.jpg'
    },
    {
        id: 6,
        name: 'Standard6',
        price: 9.90,
        about: 'Lorem ipsum dolor sit amet, consect etuer adipis cing elit, sed diam numy',
        imgURL: '/images/burgers/burger6.jpg'
    },
]