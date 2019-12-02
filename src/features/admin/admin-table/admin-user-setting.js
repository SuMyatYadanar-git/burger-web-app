import React, { useState, } from 'react'

import { changePwd, changeUserName } from '../../../network/userFetcher'


const AdminUserSetting = props => {
    const [Npwd, setNpwd] = useState('')
    const [Cpwd, setCpwd] = useState('')
    const [name, setName] = useState(JSON.parse(localStorage.getItem('data')) === null
        ? '' :
        JSON.parse(localStorage.getItem('data')).payload[0].user_name)

    const userData = JSON.parse(localStorage.getItem('data'))
    if (userData === null) {
        props.history.replace('/')
        return null;
    }
    const id = userData.payload[0].id
    const token = useState.token

    const _onChangePwd = () => {
        Npwd.length < 3 && alert('password must be above 4character at least!')
        if (Npwd === Cpwd) {
            let info = { Npwd, id, token }
            changePwd(info, (error, data) => {
                if (error) console.log('fetching error', error)
                else {
                    console.log(data)
                    data.success === true && alert(data.message)
                }
            })
        } else {
            alert('new passwrod and confirm password must be the same!')
            console.log('db error')
        }
    }

    const _onChangeName = (e) => {
        e.preventDefault()
        let info = { name, id, token }
        changeUserName(info, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                const updateName = data.payload[0].user_name
                setName(updateName)
                alert('successfully updated')
                // data.success === true && alert(data.message)
            }
        })
    }

    return (
        <div className="container">
            <form className="m-0 px-0 py-5 border" onSubmit={(e) => { _onChangePwd(); e.preventDefault() }} style={{ fontSize: '1.8rem' }} >
                {/* <div className="form-group d-flex justify-content-center">
                    <label className="col-lg-2" >Password</label>
                    <input type="password"
                        name="current-password"
                        className="form-control col-lg-5"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required />
                </div> */}
                <div className="form-group d-flex justify-content-center" >
                    <label className="col-lg-2" >New Password</label>
                    <input type="password"
                        name="new-password"
                        className="form-control col-lg-5 "
                        style={{ height: '3rem' }}
                        value={Npwd}
                        onChange={(e) => setNpwd(e.target.value)}
                        required />
                </div>
                <div className="form-group d-flex justify-content-center">
                    <label className="col-lg-2" >Confirm Password</label>
                    <input type="password"
                        name="comfirm-password"
                        className="form-control col-lg-5 "
                        style={{ height: '3rem' }}
                        value={Cpwd}
                        onChange={(e) => setCpwd(e.target.value)}
                        required />
                </div>
                <div className="form-group d-flex justify-content-center">
                    <label className="col-lg-2" ></label>
                    <input className="btn btn-warning form-control bg-warning  col-lg-5"
                        style={{ height: '3rem', fontSize: '1.5rem' }}
                        type="submit"
                        onClick={() => console.log('hellooooo')}
                    />

                </div>
            </form>

            <form className="border mt-5 p-4 " style={{ fontSize: '1.8rem' }}>
                <div className="form-group d-flex justify-content-center">
                    <label className="col-lg-2" >Change Name</label>
                    <input type="text"
                        name="update-name"
                        className="form-control col-lg-5"
                        style={{ height: '3rem', fontSize: '1.8rem' }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </div>
                <div className="form-group d-flex justify-content-center">
                    <label className="col-lg-2" ></label>
                    <button
                        className="btn btn-warning form-control bg-warning  col-lg-5"
                        style={{ height: '3rem', fontSize: '1.5rem' }}
                        type="submit"
                        onClick={(e) => _onChangeName(e)}
                    >
                        Submit
                    </button>
                    {/* <input
                        className="btn btn-warning form-control bg-warning  col-lg-5"
                        style={{ height: '3rem', fontSize: '1.5rem' }}
                        type="submit"
                        onClick={(e)=>_onChangeName(e)}
                    /> */}
                </div>
            </form>
        </div>
    )
}
export default AdminUserSetting