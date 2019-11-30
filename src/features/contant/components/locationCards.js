import React from 'react'
import { withMedia } from 'react-media-query-hoc'

const LocationCard = props => {
    const { media, profile } = props
 
    return (
        <div className='d-flex flex-wrap '>
            {profile.map((v, k) =>
                <div className='col-lg-3 col-sm-6 text-center pb-2 px-1 p-0' key={k}>
                    <div className="d-flex flex-column align-items-center border" style={{ fontFamily: 'Volkhov', fontSize: media.desktop ? 20 : media.tablet ? 16 : 14, }}>
                        <span className="py-2"> <i className="fa fa-map-marker-alt fa-7x" style={{ color: 'gold' }} /> </span>
                        <span className='font-weight-bold py-2' style={{ fontSize: 20 }}>{v.name}</span>
                        <span className="py-2">{v.address}</span>
                        <span className="py-2">{v.phone}</span>
                    </div>

                </div>
            )}
        </div>
    )
}
export default withMedia(LocationCard)

const LocationData = [
    {
        name: 'Brooklyn',
        address: '231 Hudson St, New York, NY 10013',
        phone: '+001 212-342-7000'
    },
    {
        name: 'Brooklyn',
        address: '231 Hudson St, New York, NY 10013',
        phone: '+001 212-342-7000'
    },
    {
        name: 'Brooklyn',
        address: '231 Hudson St, New York, NY 10013',
        phone: '+001 212-342-7000'
    },
    {
        name: 'Brooklyn',
        address: '231 Hudson St, New York, NY 10013',
        phone: '+001 212-342-7000'
    },
]