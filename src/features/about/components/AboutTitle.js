import React from 'react'
import { withMedia } from 'react-media-query-hoc'

import bg1 from '../../../Images/burgerBackground/burger1.jpg'

const AboutTitle = props => {
    const { media } = props

    const bgstyle = {
        padding: ' 13%',
        backgroundImage: `url(${bg1})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
       textShadow: '1px 1px grey'
    }

   
    return (
        <div className="  text-center position-relative w-auto text-light" style={bgstyle} >
            <div style={{   fontFamily: 'Volkhov', fontSize:media.desktop ? 30 : media.tablet ? 20 : 18 ,  }}>
            <span className="font-weight-bold" style={{fontSize:35}}>About Us</span>
            <p style={{ fontWeight: 'lighter' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit.
                 Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut.
            </p>
            </div>
           
        </div>
    )
}

export default withMedia(AboutTitle)