import React from 'react'
import ReactPlayer from 'react-player'

const ReactPlayerContainer = props => {
    return (<div className=''>
         <ReactPlayer
            className='w-100'
            url={'http://youtu.be/jxau346dUiw?controls=0'}
            // width='100%'
            // height='100%'
        />
    </div>
       
    )
}

export default ReactPlayerContainer;