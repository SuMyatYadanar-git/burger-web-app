import React from 'react'
import BurgerLogo from '../../assets/icons/Burger'
import KumoIcon from '../../Images/kumo_Logo.png'
import * as Colors from '../../config/color.config'
import { withMedia } from 'react-media-query-hoc'
import BurgerImage from '../../Images/burgerBackground/bg1.jpg'


const Footer = props => {
    const { media } = props
    return (
        <div className='container-fluid ' style={{ backgroundImage: `url(${BurgerImage})` }}>
            <div className='container text-light pt-5' style={{ fontSize: media.desktop ? 16 : media.tablet ? 16 : 13, textAlign: 'left' }}>
                <div className='d-flex flex-row justify-content-between flex-wrap pt-5' style={{ paddingBottom: `${window.innerWidth <= 991 ? '10px' : '180px'}`, borderBottom: `1px solid ${Colors.Price}` }}>
                    <div className='col-lg-4 col-12 py-2'>
                        <div style={{ height: '60px' }}>
                            <img src={KumoIcon} width={100} />
                            {/* <BurgerLogo width={'50px'} height={'50px'} /> */}
                        </div>
                        <div style={{ lineHeight: '25px', textAlign: 'justify', fontFamily: 'Volkhov' }}>
                            Lorem ipsum dolor sit amet, consect etuer adipiscing elit, sed diam nonummy nibh euismod aliquet vel illum dolore eu feugiat nulla facilisis
                   </div>
                    </div>

                    <div className='col-lg-6 py-2' style={{ fontFamily: 'Volkhov' }}>
                        <div style={{ height: '60px', lineHeight: '50px', color: `${Colors.Price}` }}>
                            WHERE TO FIND US
                    </div>
                        <table>
                            <tbody>
                                <tr style={{ height: '30px' }}><td style={{ width: '30px' }}><i className="fas fa-map-marker-alt text-warning" /></td><td>198 West 21th Street, Suite 721</td></tr>
                                <tr style={{ height: '30px' }}><td><i className="fas fa-envelope text-warning" /></td><td>mail@qodeinteractive.com</td></tr>
                                <tr style={{ height: '30px' }}><td><i className="fas fa-phone-alt text-warning" /></td><td>198 West 21th Street, Suite 721</td></tr>
                            </tbody>

                        </table>
                    </div>

                    {/* <div className='col-lg-4 col-12 py-2' style={{ fontFamily: 'Volkhov' }}>
                    <div style={{ height: '60px', lineHeight: '50px', color: `${Colors.Price}` }}>
                        WHERE TO FIND US
                    </div>
                    <input className='form-control mb-3' style={{ height: '40px', border: `1px solid ${Colors.Price}` }} />
                    <button className='btn btn-warning w-100 text-dark' style={{ height: '40px' }}>SUBMIT</button>
                </div> */}
                </div>
                <div style={{ textAlign: 'center', padding: 10, fontFamily: 'Volkhov' }}>© Copyright Kumo Solutions 2019</div>
            </div>
        </div>

    )
}

export default withMedia(Footer)