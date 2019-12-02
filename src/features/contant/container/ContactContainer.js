import React, { useState, useEffect } from 'react'
import { withMedia } from 'react-media-query-hoc'

import LocationCard from '../components/locationCards'
import ContactPage from '../components/contactForm'
import BurgerImage from '../../../Images/burgerBackground/bg2.jpg'
import ContactMap from '../../map/contactMap'
import { getAllProfile } from '../../../network/profileFetcher'

const ContactContainer = props => {
    const { media } = props
    // const [width, setWidth] = useState(window.innerWidth);
    // const [height, setHeight] = useState(window.pageYOffset);
    const [profile, setProfile] = useState([])


    useEffect(() => {
        getAllProfile((error, data) => {
            if (error != null) console.error(error)
            else setProfile(data)

        })
    }, [])
    //     const handleResize = () => setWidth(window.innerWidth);
    //     const y = () => setHeight(window.pageYOffset)

    //     window.addEventListener('resize', handleResize)
    //     window.addEventListener('resize', handleResize)

    //     return () => {
    //         window.removeEventListener('resize', y)
    //         window.removeEventListener('resize', handleResize)
    //     }
    // },

    return (
        <div className='container-fluid' >
            <div className='row justify-content-center text-center text-light '
                style={{
                    backgroundImage: `url(${BurgerImage})`,
                    backgroundSize: 'cover',
                    fontFamily: 'Volkhov', padding: '12%',
                    fontSize: media.desktop ? 30 : media.tablet ? 20 : 15,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    textShadow: '1px 1px grey'
                }}>
                <span
                    style={{ fontWeight: 'bold', fontSize: 30 }}>The Best From Our Offer</span>
                <br />
                <span style={{ fontWeight: 'lighter' }}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                    nibh euismod tincidunt ut laoreet dolore magna aliquam</span>
            </div>
            <div className='bg-success' style={{ height: '300px' }}>
                <ContactMap />
            </div>

            <div className="pt-4 pb-5">
                <LocationCard profile={profile} />
            </div>
            <div>
                <ContactPage />
            </div>
        </div>



    )
}

export default withMedia(ContactContainer)