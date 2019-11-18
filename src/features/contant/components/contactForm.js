import React from 'react'
import { withMedia } from 'react-media-query-hoc'

import * as Colors from '../../../config/color.config'

const CommentForm = (props) => {
    const { media } = props
    return (
        <div className='row justify-content-center py-5'  style={{ background:Colors.bgRed, color: 'white',}}>
            <div className='col-lg-6'  style={{fontSize: media.desktop ? 30 : media.tablet ? 20 : 18 ,fontFamily: 'Volkhov'}}>
                <span className="font-weight-bold" style={{fontSize:30}}>Get In Touch</span>
                <p style={{ fontSize: media.desktop ? 16 : media.tablet ? 14 : 12}} className='pb-5'>Lorem ipsum dolor sit amet, consectetuer adipis cing elit, sed diam nonummy summiel nibh</p>
                <form>
                    <input className='form-control mb-4 ' style={{fontSize:14,   border: `1px solid ${Colors.Price}`, height: '40px' }} placeholder={'Name'} />
                    <input className='form-control mb-4 ' style={{fontSize:14,   border: `1px solid ${Colors.Price}`, height: '40px' }} placeholder={'Email'} />
                    <textarea className='form-control mb-4 ' style={{ fontSize:14,  border: `1px solid ${Colors.Price}`, minHeight: '80px', maxHeight: '80px' }}
                        placeholder={'Message'} />
                    <button className='btn btn-warning w-100 text-light mb-4' style={{ fontSize: '16px' }}>SEND</button>

                </form>
            </div>
        </div>


    )
}

export default withMedia(CommentForm)