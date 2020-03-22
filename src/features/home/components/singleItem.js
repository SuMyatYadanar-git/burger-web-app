import React from 'react'
import { withMedia } from 'react-media-query-hoc'

import bg1 from '../../../Images/bgt.jpg'

const SingleItem = props => {
    const { media } = props
    var bgtextstyle = {
        display: 'inline-block',
        left: '3rem',
        color: 'white',
        borderRadius: 5,
        textAlign: 'center',
        marginTop: !media.mobile && '5%',
        textShadow:'1px 1px grey'
    }

    return (
            <div>
                <div style={{ fontFamily: 'Volkhov',fontSize: media.desktop ? 20 : media.tablet ? 16 : 13 }}>
                    <img src={bg1} alt="single-burger" className="img-fluid position-relative" />
                    <div className={`position-absolute  p-0  ${media.mobile && 'm-4'} `} style={bgtextstyle}>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,<br /> sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam<br />
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                  </p>
                    </div>
                </div>
                {/* ======================================================================================================== */}
                {/* <div className="d-flex justify-content-between align-items-center p-4 bg-dark" >
                    <div style={{ fontSize: media.desktop ? 25 : 15 }}><span className="font-weight-bold text-center text-light"> Are you ready to order? </span></div>
                    <Link to={route.contant} style={{ textDecoration: 'none' }}>
                        <div className="d-block w-100  text-center px-3 py-2 text-light"
                            style={{ borderRadius: 5, background: '#FFC107', cursor: 'pointer' }}>
                            <span style={{ fontSize: media.desktop ? 25 : 15 }}>contact us </span>
                        </div>
                    </Link>
                </div> */}

            </div >
    )
}
export default withMedia(SingleItem);