import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { GetloginData } from '../../../../network/userFetcher'
import KmLogo from '../../../../Images/kumo_Logo.png'
import KmModal from '../../../../common/KmModal'
import * as route from '../../../../config/route.config'

const AdminNavbar = props => {
    const { history } = props

    const _onClickLogout = () => {
        localStorage.removeItem('data');
        // history.push(`/${route.admin}`)
         history.replace(`/${route.admin}`)
    }
    const loginName = JSON.parse(localStorage.getItem('data')) === null ?
        'admin' :
        JSON.parse(localStorage.getItem('data')).payload[0].user_name

    return (
        <div className="container-fluid p-0">
            <div className="d-flex flex-row justify-content-between p-4 bg-warning">
                <div className="d-flex flex-row justify-content-center align-items-center font-weight-bold" style={{ fontSize: '1.5rem', }}>
                    <div className="dropdown" >
                        <button style={{ fontSize: '1.5rem' }} className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="px-4 font-weight-bold"> {loginName} </span>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ fontSize: '1.8rem' }}>
                            {/* <Link to='/admin-category' style={{ textDecoration: 'none' }}> <div className="dropdown-item">Category</div> </Link>
                        <div className="dropdown-divider" />
                        <Link to='/admin-product' style={{ textDecoration: 'none' }}><div className="dropdown-item">Product</div> </Link>
                        <div className="dropdown-divider" />
                        <Link to='/admin-profile' style={{ textDecoration: 'none' }}> <div className="dropdown-item">Profile</div></Link>
                        <div className="dropdown-divider" />
                        <Link to='/user' style={{ textDecoration: 'none' }}> <div className="dropdown-item">User</div></Link>
                        <div className="dropdown-divider" /> */}
                            <div className="dropdown-item"
                                onClick={() => _onClickLogout()}
                                style={{ cursor: 'pointer' }}
                            >
                                Log Out
                             </div>
                        </div>
                    </div>

                    <Link to='/admin-category' style={{ textDecoration: 'none', }}> <div className="px-3">Category</div> </Link>
                    <Link to='/admin-product' style={{ textDecoration: 'none', }}><div className="px-3">Product</div> </Link>
                    <Link to='/admin-profile' style={{ textDecoration: 'none', }}> <div className="px-3">Profile</div></Link>
                    <Link to='/user' style={{ textDecoration: 'none', }}> <div className="px-3">User</div></Link>

                </div>
                <div><img src={KmLogo} className="img-fluid" width={50} /></div>
            </div>
            {/* <nav aria-label="breadcrumb" className="d-flex justify-content-between align-items-center ">
                <ol className="breadcrumb " style={{ backgroundColor: 'transparent', fontSize: '1.5rem', }}>
                    <li className="breadcrumb-item text-dark" aria-current="page">{history.location.pathname.slice(1)}</li>
                </ol>
            </nav> */}

        </div>
    )

}
export default withRouter(AdminNavbar);