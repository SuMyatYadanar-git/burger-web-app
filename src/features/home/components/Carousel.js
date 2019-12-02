import React from 'react'
import { withMedia } from 'react-media-query-hoc'
import {Link} from 'react-router-dom'

import photo from '../../../Images/bg1.jpg'
import photo1 from '../../../Images/bg5.jpg'
import photo2 from '../../../Images/eggbg.jpeg'
import * as route from '../../../config/route.config'
import '../../../assets/css/carousel.css'

// height: media.desktop ? 680 : media.tablet ? 500 : 250 
const CarouselContainer = props => {
    const { media } = props
    return (
        <div className=" text-center w-100 " style={{  fontFamily: 'Volkhov', height: media.desktop ? 680 : media.tablet ? 500 : 230 , position: 'relative', zIndex: 5 }}>
            {/* <!-- Full Page Image Background Carousel Header --> */}
            <div id="myCarousel" className="carousel slide">
                {/* <!-- Indicators --> */}
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                {/* <!-- Wrapper for Slides --> */}
                <div className="carousel-inner">
                    <CarouselItem                        
                        image={photo}
                        title={"Caption Animation"}
                        info={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                        text={"Learn More"}
                        media={media}
                    />
                    <CarouselItem
                    current={true}
                        image={photo1}
                        title={"Caption Animation"}
                        info={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                        text={"Learn More"}
                        media={media}
                    />
                    <CarouselItem
                        image={photo2}
                        title={"Caption Animation2"}
                        info={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                        text={"Learn More"}
                        media={media}
                    />
                    {/* <!-- Controls --> */}
                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="icon-prev"></span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="icon-next"></span>
                    </a>
                </div>
            </div>
        </div>
    )
}

const CarouselItem = ({ image, title, info, text, current, media }) => {
    return (
        <div className={`item ${current ? 'active' : 'none'}`} >
            <div className="flex-fill">
                <img src={image} alt="carousel-img" className="img-fluid w-100"  />
                <div className="carousel-caption " style={{ fontFamily: 'Volkhov',lineHeight:1.8, fontSize: media.desktop ? 30 : media.tablet ? 20 : 18 }}>
                    < span className="animated fadeInDown " >{title}</span>
                    <p className="animated fadeInUp" >{info}</p>
                    <p className="animated fadeInUp">
                        <Link to={`${route.burgerInfo}`} className={`btn btn-transparent btn-rounded btn-lg p-3`} style={{fontSize: media.desktop ? 15 : media.tablet ? 12 : 10}}>
                            {text}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default withMedia(CarouselContainer);