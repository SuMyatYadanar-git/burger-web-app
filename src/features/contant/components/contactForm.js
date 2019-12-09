import React, { useState, useRef } from 'react'
import { withMedia } from 'react-media-query-hoc'
import Swal from 'sweetalert2'

import * as Colors from '../../../config/color.config'
import { mailSender } from '../../../network/MailSender'

const CommentForm = (props) => {
    const { media } = props
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [message, setMessage] = useState('')
    const formRef = useRef(null)
    const userNameInput = useRef('')

    const validate = () => formRef.current.reportValidity();

    const _onSendMail = (e) => {
        e.preventDefault()
        let info = { name, mail, message }
        mailSender({ info }, (error, data) => {
            if (error != null) {
                console.error("fetching error", error)
                userNameInput.current.focus();
                Swal.fire({
                    title: "Your operation failed",
                    text: 'please try again!',
                    icon: 'info',
                })
            }
            else {
                if (data.success) {
                    // console.log(data.data.accpted)
                    Swal.fire({
                        title: 'Your Email Sent Successfully',
                        text: ' thanks for messaging to us!',
                        icon: 'success',
                    })
                    setName('')
                    setMail('')
                    setMessage('')
                }
            }
        })
    }
    return (
        <div className='row justify-content-center py-5' style={{ background: Colors.bgRed, color: 'white', }}>
            <div className='col-lg-6' style={{ fontSize: media.desktop ? 30 : media.tablet ? 20 : 18, fontFamily: 'Volkhov' }}>
                <span className="font-weight-bold" style={{ fontSize: 30 }}>Get In Touch</span>
                <p style={{ fontSize: media.desktop ? 16 : media.tablet ? 14 : 12 }} className='pb-5'>Lorem ipsum dolor sit amet, consectetuer adipis cing elit, sed diam nonummy summiel nibh</p>
                <form ref={formRef} onSubmit={(e) => _onSendMail(e)}>
                    <input
                        type="text"
                        ref={userNameInput}
                        className='form-control mb-4 '
                        style={{ fontSize: 14, border: `1px solid ${Colors.Price}`, height: '40px' }}
                        placeholder={'Name'}
                        aria-describedby="addon-wrapping"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        autoFocus={true}
                        required
                    />
                    <input
                        type="email"
                        className='form-control mb-4 '
                        style={{ fontSize: 14, border: `1px solid ${Colors.Price}`, height: '40px' }}
                        placeholder={'Email'}
                        onChange={e => setMail(e.target.value)}
                        value={mail}
                        pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
                        required
                    />
                    <textarea
                        className='form-control mb-4'
                        rows="3"
                        style={{ fontSize: 14, border: `1px solid ${Colors.Price}`, minHeight: '80px', maxHeight: '80px' }}
                        placeholder={'Message'}
                        onChange={e => setMessage(e.target.value)}
                        value={message}

                        required
                    />
                    <button className='btn btn-warning w-100 text-light mb-4'
                        type="submit"
                        style={{ fontSize: '16px' }}
                        onClick={validate}
                    >
                        SEND
                        </button>
                </form>
            </div>
        </div>


    )
}

export default withMedia(CommentForm)