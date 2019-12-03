import React, { useState } from 'react'
import '../../../App.css'
import { withRouter } from 'react-router-dom'
import MyButton from '../../../common/myButton'
import * as route from '../../../config/route.config'
import { loginFetcher } from '../../../network/loginFetcher'

const LoginContainer = props => {
    const [name, setName] = useState('')
    const [pwd, setPwd] = useState('')
    const [pwdView, setpwdView] = useState(false)

    const onClickLog = (e) => {
        e.preventDefault()
        let info = { name, pwd }
        loginFetcher(info, (error, data) => {
            if (error) console.log(error)
            else if (data.success === true) {
                localStorage.setItem('data', JSON.stringify(data))
                props.history.replace(`/${route.adminProfile}`)             
            }
            else {
                alert(data.message)
                setName('')
                setPwd('')
            }
        })
    }
    // if (localStorage.getItem('data') !== null) 

    return (
        <div className="container-fluid p-0">
            <div className="bg-dim full-bg-size ">

                {/* <div className="text-center font-weight-bold text-capitalize text-light  pb-5">
                        <h3>please  login  to  your  account</h3>
                    </div> */}
                {/* ====================================================================================== */}
                <div className="text-light " style={{ position: 'absolute', top: '20%', width: '98%', paddingLeft: '2%' }}>
                    <div className="d-flex flex-row justify-content-center ">
                        <div className="col-12 col-sm-8 col-md-8 col-lg-4">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h2 className="pb-3">Welcome!</h2>
                                <h4 className="pt-2 pb-3">Login to your Account</h4>
                            </div>
                            {/* onSubmit={(e) => { onClickLog(); e.preventDefault() }} */}
                            <form onSubmit={(e) => { onClickLog(e) }}>
                                <div className="form-group pt-3">
                                    <label style={{ fontSize: 18 }}>Name:</label>
                                    {/* <input type="text" className="form-control" pattern="^[0]{1}[9]{1}[0-9]{9}$" required /> */}
                                    <input type="text"
                                        className="form-control w-100 "
                                        style={{ height: '4rem', fontSize: 14, }}
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ fontSize: 18 }}>Password:</label>
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
                                    // style={{ width: 200 }}

                                    />
                                </div>
                                {/* <div className="d-flex justify-content-center pt-3 pb-2">
                                    <span style={{ textAlign: 'center', cursor: 'pointer' }}>Forget Password?</span>
                                </div> */}

                            </form>
                        </div>
                    </div>

                </div>

                {/* <form>
                        <div className="d-flex flex-column justify-content-center align-items-center text-light">
                            <div className="d-flex flex-row justify-content-between">
                                <div className=" p-3 " style={{ fontSize: 20 }}><i class="fas fa-user" /></div>
                                <div className="flex-fill">
                                    <input type="text"
                                        className="form-control w-100 "
                                        style={{ height: '4rem', fontSize: 15, }}
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        required
                                    /></div>
                            </div>

                            <div className="d-flex flex-row">
                                <div className=" p-3 " style={{ fontSize: 20 }}><i class="fas fa-lock"></i></div>
                                <div className="col-lg-12">
                                    <input type="password"
                                        className="form-control w-100"
                                        style={{ height: '4rem', fontSize: 15 }}
                                        placeholder="password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                    />
                                </div>
                            </div>
                          
                            <div className="flex-fill  ">
                                <MyButton
                                    text="login"
                                    className="btn-outline-warning btn-block "
                                     style={{ width:'200%' }}
                                    onClick={() => alert('login click')}
                                />
                            </div>

                        </div>
                    </form> */}


                {/* <div className="d-flex  justify-content-center align-items-center text-light " >
                        <form className="">
                            <div className="d-flex flex-row align-items-center py-3">
                                <div className="border-0 p-3 " style={{ fontSize: 20 }}><i class="fas fa-user" /></div>
                                <div className="px-3 col-lg-12">
                                    <input type="text"
                                        className="form-control w-100"
                                        style={{ height: '4rem', fontSize: 15, }}
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center pb-2 py-3">
                                <div className="border-0 p-3 " style={{ fontSize: 20 }}><i class="fas fa-lock"></i> </div>
                                <div className="px-3 col-lg-12">
                                    <input type="password"
                                        className="form-control w-100"
                                        style={{ height: '4rem', fontSize: 15 }}
                                        placeholder="password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12" >

                                <MyButton
                                    text="login"
                                    className="btn-outline-warning btn-block w-100"
                                    // style={{ width: 200 }}
                                    onClick={() => alert('login click')}
                                />
                            </div>
                            <div><span>forget your password</span></div>

                        </form>

                    </div> */}
            </div>
        </div>

    )
}

export default withRouter(LoginContainer)