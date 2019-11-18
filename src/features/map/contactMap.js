import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const ContactMap = (props) => {
    const style = {
        width: '100%',
        height: '300px'
    }
    return (
        <div className='col-sm-12 p-0 m-0'>
            <Map
                google={window.google}
                zoom={15}
                style={style}
                initialCenter={{
                    lat: 21.942797,
                    lng: 96.107823
                }}>

                <Marker
                    name={'Current location'} />

                <InfoWindow>
                    <div>
                        <h1>{'dd'}</h1>
                    </div>
                </InfoWindow>
            </Map>
        </div>

    )
}

export default GoogleApiWrapper({ apiKey: ("AIzaSyAcWK8WHabUh0BMDZuIIPo0qfWXWarBzoo") })(ContactMap)