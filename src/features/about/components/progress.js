import React from 'react'
import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css";

const ProgressContainer = props => {
    const { progressdata, className = "", style = {}, desc = '' } = props
   
    const defaultStyle = {  marginBottom: 20, fontWeight:'bold', fontFamily: 'Volkhov' }
    return (
        <div >
            <div className="px-5 font-weight-bold" >{desc}</div>
            <Progress
                theme={{
                    success: {
                        symbol: '🏄‍',
                        color: '#664418',
                    },
                    active: {
                        color: '#664418',
                        trailColor: '#aaaaaa'
                    }
                }}
                percent={progressdata}
                className={className}
                style={{ ...defaultStyle, ...style }}
            />
        </div>
    )
}

export default ProgressContainer;

