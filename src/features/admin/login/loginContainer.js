import React, { useState, useRef } from 'react'
import Swal from 'sweetalert2'
import '../../../App.css'
import { withRouter } from 'react-router-dom'
import MyButton from '../../../common/myButton'
import * as route from '../../../config/route.config'
import { loginFetcher } from '../../../network/loginFetcher'


const LoginContainer = props => {
    const [name, setName] = useState('')
    const [pwd, setPwd] = useState('')
    const [pwdView, setpwdView] = useState(false)
    const userNameInput = useRef('')

    const onClickLog = (e) => {
        e.preventDefault()
        const md5 = require('md5')
        let info = { name, pwd: md5(pwd) }
        loginFetcher(info, (error, data) => {
            if (error) console.log(error)
            else if (data.success === true) {
                localStorage.setItem('data', JSON.stringify(data))
                props.history.replace(`/${route.adminCategory}`)
            }
            else {
                userNameInput.current.focus();
                Swal.fire({
                    title: 'username and password incorret',
                    text: 'please login again',
                    icon: 'error',
                })
                setName('')
                setPwd('')
            }
        })
    }

    return (
        <div className="container-fluid p-0">
            <div className="bg-dim full-bg-size ">
                {/* ====================================================================================================================== */}
                <div className="text-light " style={{ position: 'absolute', top: '20%', width: '98%', paddingLeft: '2%' }}>
                    <div className="d-flex flex-row justify-content-center ">
                        <div className="col-12 col-sm-8 col-md-8 col-lg-4">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h2 className="pb-3">Welcome!</h2>
                                <h4 className="pt-2 pb-3">Login to your Account</h4>
                            </div>
                            {/* onSubmit={(e) => { onClickLog(); e.preventDefault() }} */}
                            <form onSubmit={(e) => { onClickLog(e) && document.getElementById('userName').focus() }}>
                                <div className="form-group pt-3 ">
                                    <label style={{ fontSize: 18 }} className=" d-flex align-items-start">Name:</label>
                                    {/* <input type="text" className="form-control" pattern="^[0]{1}[9]{1}[0-9]{9}$" required /> */}
                                    <input type="text"
                                        ref={userNameInput}
                                        className="form-control w-100 "
                                        style={{ height: '4rem', fontSize: 14, }}
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        autoFocus={true}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ fontSize: 18 }} className=" d-flex align-items-start">Password:</label>
                                    <input
                                        type={pwdView ? "text" : "password"}
                                        className="form-control w-100"
                                        style={{ height: '4rem', fontSize: 14 }}
                                        placeholder="password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                    />

                                    {/* this.setState(prev => ({ pwdview: !prev.pwdview })) */}
                                    <div href="#" className="position-relative float-right pr-3 "
                                        style={{ top: '-30px', cursor: 'pointer', color: 'black', fontSize: 15 }}>
                                        <span onClick={() => setpwdView(!pwdView)}> {pwdView === true ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>} </span>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <MyButton
                                        text="login"
                                        type="submit"
                                        className="btn-outline-warning btn-block"
                                        style={{ color: 'black' }}
                                    />
                                </div>
                                {/* <div className="d-flex justify-content-center pt-3 pb-2">
                                    <span style={{ textAlign: 'center', cursor: 'pointer' }}>Forget Password?</span>
                                </div> */}
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default withRouter(LoginContainer)