import React from 'react'
import { withMedia } from 'react-media-query-hoc'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../../assets/css/burgerTypehover.css'
import * as route from '../../../config/route.config'
import './slider.css'
import { IMG_SERVER } from '../../../network/api'

const CardItem = props => {
    const { media, category } = props
    console.log(category)
    if (category.length === 0) return null;

    const settings = {
        dots: false,
        slidesToScroll: 1,
        infinite: true,
        speed: 800,
        focusOnSelect: true,
        rows: 1,
        autoplay: true,
        slidesToShow: 1,
        slidesPerRow: (media.desktop || media.tablet) ? 3 : 1,
        //  centerMode: true,
        className: 'slides h-100',
        arrows: (media.desktop || media.tablet) ? true : false
    }

    return (
        <div className="  container-fluid " style={{ position: 'relative', zIndex: 5, backgroundColor: 'white' }}>
            <div className="container">
                <div className=" text-center text-muted py-4 px-2 " style={{ fontFamily: 'Volkhov', lineHeight: 1.5, fontSize: media.desktop ? 20 : media.tablet ? 17 : 15 }}>
                    <span className="font-weight-bold" style={{ fontSize: 25 }}>Choose your passion!</span>
                    <p >Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam. Lorem ipsum dolor sit amet,</p>
                </div>

                <div id="box" style={{ overflow: 'hidden', scrollBehavior: 'smooth' }}>
                    <Slider {...settings}>
                        {
                           category.map((v, k) => {
                                return (
                                    <div className="px-1" key={k}>
                                        <BurgerType img={`${IMG_SERVER}/${v.c_img}`} title={v.c_name} media={media} />
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>


        </div>
    )
}

const BurgerType = ({ img, title, media }) => {

    return (
        // ,height:  media.desktop ? '89%' :'90%'

        <div className="hovereffect "
            style={{ cursor: 'pointer', objectFit: 'cover', height: media.desktop ? '89%' : '90%', }} >
            <img className="img-fluid w-auto" src={img} alt="burger-category" style={{ height: 300, }} />
            <div className="overlay" >
                <Link to={route.burger}
                    style={{ textDecoration: 'none', fontFamily: 'Volkhov', fontSize: media.desktop ? 20 : media.tablet ? 16 : 11 }}><span>{title}</span></Link>
            </div>
        </div>

    )
}

export default withMedia(CardItem)