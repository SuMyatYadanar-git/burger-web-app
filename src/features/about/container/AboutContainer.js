import React from 'react'
import { withMedia } from 'react-media-query-hoc';

import Content from '../components/content';
import '../../../../src/assets/css/about.css'
import AboutTitle from '../components/AboutTitle'
import Progress from '../components/progress'
import ReactPlayer from '../components/ReactPlayer'

import * as Colors from '../../../config/color.config'
import MenuCard from '../components/MenuCard';
import CardData from '../components/cardData';



const AboutContainer = props => {
    const { media } = props
    
    return (
        <div>           
            <div className="bg-light">

                <div className="container-fluid p-0 overflow-hidden">
                    <div>  <AboutTitle /></div>

                    <div className="d-flex flex-wrap flex-lg-nowrap p-4" style={{ background: `${Colors.Price}`,  fontFamily: 'Volkhov',}}>
                        <div className="flex-fill py-3">
                            <span className="px-5 py-4 font-weight-bold" style={{fontSize:media.desktop ? 35 : media.tablet ? 25 : 20 }}>Our Process</span>
                            <p className="px-5 py-2" style={{fontSize: media.desktop ? 20 : media.tablet ? 15 : 13}}>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinci
                             </p>
                            <Progress progressdata={60} className="px-5 " desc={"MEETINGS"} />
                            <Progress progressdata={70} className="px-5 " desc={"BRAINSTORMING"} />
                            <Progress progressdata={80} className="px-5 " desc={"DEVELOPMENT"} />
                        </div>
                        <div className="flex-fill" style={{ border: '4px solid white' }}><ReactPlayer /></div>
                    </div>

                    <div className="mx-auto pt-4 ">
                        <Content />
                    </div>

                    {/* <div className="row justify-content-center mb-1 " >
                        <div className="col-xs-12 col-lg-3 mx-1 pt-5" style={{ borderBottom: `2px solid ${Colors.bgRed}` ,}} >
                            <MenuCard title={"Burgers"}>
                                <CardData menu="Classic Burger" price="2.99" desc="An forensibus incorrupte con" />
                                <CardData menu="Special Big Burger" price="4.99" desc="Et ius platonem electram, et ancillae " />
                                <CardData menu="Mexican Burger" price="3.99" desc="An forensibus concludaturque " />
                                <CardData menu=" Classic Burger " price="2.99" desc="An forensibus incorrupte " />
                                <CardData menu="Special Big Burger" price="4.99" desc="Et ius platonem electram, et ancillae " />
                                <CardData menu="Mexican Burger" price="3.99" desc="An forensibus concludaturque " />
                            </MenuCard>
                        </div>
                        <div className="col-xs-12 col-lg-3  mx-1 pt-5" style={{ borderBottom: `2px solid ${Colors.bgRed}` }} >
                            <MenuCard title={"Sandwiches"}>
                                <CardData menu="Classic Burger" price="2.99" desc="An forensibus incorrupte con" />
                                <CardData menu="Special Big Burger" price="4.99" desc="Et ius platonem electram, et ancillae " />
                                <CardData menu="Mexican Burger" price="3.99" desc="An forensibus concludaturque " />
                                <CardData menu=" Classic Burger " price="2.99" desc="An forensibus incorrupte " />
                                <CardData menu="Special Big Burger" price="4.99" desc="Et ius platonem electram, et ancillae " />
                                <CardData menu="Mexican Burger" price="3.99" desc="An forensibus concludaturque " />
                            </MenuCard>
                        </div>
                        <div className="col-xs-12 col-lg-3  mx-1 pt-5" style={{ borderBottom: `2px solid ${Colors.bgRed}` }}>
                            <MenuCard title={"Salads"}>
                                <CardData menu="Classic Burger" price="2.99" desc="An forensibus incorrupte con" />
                                <CardData menu="Special Big Burger" price="4.99" desc="Et ius platonem electram, et ancillae " />
                                <CardData menu="Mexican Burger" price="3.99" desc="An forensibus concludaturque " />
                                <CardData menu=" Classic Burger " price="2.99" desc="An forensibus incorrupte " />
                                <CardData menu="Special Big Burger" price="4.99" desc="Et ius platonem electram, et ancillae " />
                                <CardData menu="Mexican Burger" price="3.99" desc="An forensibus concludaturque " />
                            </MenuCard>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>

    )
}

export default withMedia(AboutContainer);

