import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withMedia } from 'react-media-query-hoc'

import * as route from '../../config/route.config'
import BurgerIcon from '../../assets/icons/Burger'
import KumoIcon from '../../Images/kumo_Logo.png'
import MyLink from '../../common/myLink'
import * as Colors from '../../config/color.config'

const Navbar = props => {
    const { match, media, location } = props
    const [barClick, setBarClick] = useState(false)

    const _handleBar = () => {
        setBarClick(!barClick)
    }

    return (
        // style={{backgroundColor:'rgb(238,221,130,0.5)'}} rgb(248,249,195,0.4)

        <div className='container-fluid sticky-top py-4' style={{ fontSize: media.mobile ? 12 : 16, background: '#700000' }}>
            <div className='d-flex flex-row justify-content-between'>
                <div className='row'>
                    <div className='px-5 c-center'>
                    {/* <BurgerIcon width={45} height={45} />  */}
                        <Link to={route.home}>  <img src={KumoIcon}  width={100}   /> </Link>
                    </div>
                    {
                        // color: '#FF6C33'
                        (media.tablet || media.desktop || barClick) &&
                        <div className={`row pl-5 ${barClick && 'w-100 text-left'}`}>
                            <div className={`px-4 py-4 ${barClick && 'w-100'}`} style={{ borderBottom: barClick&&'1px solid #900000' }}  >
                                <MyLink to={`${match.url}`} onClick={() => { setBarClick(false) }} text="Home" currentLink={location.pathname + location.search} />
                            </div>
                            <div className={`px-4 py-4 ${barClick && 'w-100'}`} style={{ borderBottom: barClick&&'1px solid #900000' }} >
                                <MyLink to={`${match.url}${route.burger}`} onClick={() => { setBarClick(false) }} text="Products" currentLink={location.pathname + location.search} />
                            </div>
                            <div className={`px-4 py-4 ${barClick && 'w-100'}`} style={{ borderBottom: barClick&&'1px solid #900000' }} >
                                <MyLink to={`${match.url}${route.about}`} onClick={() => { setBarClick(false) }} text="About" currentLink={location.pathname + location.search} />
                            </div>
                            <div className={`px-4 py-4 ${barClick && 'w-100'}`}>
                                <MyLink to={`${match.url}${route.contant}`} onClick={() => { setBarClick(false) }} text="Contact" currentLink={location.pathname + location.search} />
                            </div>
                        </div>
                    }
                </div>
                {
                    // color: '#FF6C33'
                    (media.desktop || media.tablet) &&
                    <div className={`d-flex`} style={{ fontSize: 25 }}>
                        <div className=" px-3 pt-3" style={{ cursor: 'pointer' }}>
                          <a href="https://www.facebook.com/Kumo-Solutions-100459277998502/?epa=SEARCH_BOX" target="_blank" rel="noopener noreferrer"> <span style={{ color: Colors.white }}><i className="fab fa-facebook" /></span></a> 
                        </div>
                        {/* <div className=" px-3 pt-3" style={{ cursor: 'pointer' }}>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"> <span style={{ color: Colors.white }}><i className="fab fa-instagram" /></span></a>
                        </div> */}
                        {/* <div className=" px-3 pt-3" style={{ cursor: 'pointer' }}>
                          <Link to={route.delivery} ><span style={{ color: Colors.white }}><i className="fas fa-bicycle"></i></span> </Link>
                        </div> */}
                    </div>
                }
                {
                    // color: '#FF6C33'
                    (media.desktop || media.tablet) ||
                    <div className={`d-flex my-3`} style={{ fontSize: 25, border: '1px solid white', borderRadius: 5, height: '40px' }}>
                        <i className="fas fa-bars text-light px-3" onClick={_handleBar} style={{ paddingTop: 8 }} />
                    </div>
                }

            </div>

        </div>
    )
}
export default withRouter(withMedia(Navbar))

