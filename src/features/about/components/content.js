import React from 'react'
import { withMedia } from 'react-media-query-hoc'

const AboutContentContainer = props => {
    const { media } = props
    return (
        <div className="p-4 pb-0">
            <div className="text-center font-weight-bold" style={{  fontFamily: 'Volkhov', fontSize: media.desktop ? 30 : media.tablet ? 25 : 18 }}>
                <span> Have it your way</span>
            </div>
            <blockquote>
                <p className="text-justify px-4" style={{ lineHeight: 1.8, fontFamily: 'Volkhov', fontSize:media.desktop ? 18 : media.tablet ? 16 : 14 , fontStyle: 'bold' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper diam at erat pulvinar, at pulvinar felis blandit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper diam at erat pulvinar, at pulvinar felis blandit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper diam at erat pulvinar, at pulvinar felis blandit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper diam at erat pulvinar, at pulvinar felis blandit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper diam at erat pulvinar, at pulvinar felis blandit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper diam at erat pulvinar, at pulvinar felis blandit.
                </p>
            </blockquote>
        </div>
    )
}

export default withMedia(AboutContentContainer);