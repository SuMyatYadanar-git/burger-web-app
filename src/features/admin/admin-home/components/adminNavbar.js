import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { GetloginData } from '../../../../network/loginFetcher'
import KmLogo from '../../../../Images/kumo_Logo.png'


const AdminNavbar = props => {
    const { history } = props

    const [loginName, setloginNmae] = useState('admin')

    useEffect(() => {
        GetloginData((error, data) => {
            if (error) console.error('fetch error', error)
            else setloginNmae(data[0].user_name)
        })
    }, 'admin')

    return (
        <div className="container-fluid p-0">
            <div className="d-flex flex-row justify-content-between p-4 bg-warning">
                <div><img src={KmLogo} className="img-fluid" width={50} /></div>
                <div className="dropdown dropleft" >
                    <button style={{ fontSize: '1.5rem' }} className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="px-4 font-weight-bold"> {loginName} </span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ fontSize: '1.8rem' }}>
                        <Link to='/admin-category' style={{ textDecoration: 'none' }}> <div className="dropdown-item">Category</div> </Link>
                        <Link to='/admin-product' style={{ textDecoration: 'none' }}><div className="dropdown-item">Product</div> </Link>
                        <Link to='/admin-profile' style={{ textDecoration: 'none' }}> <div className="dropdown-item">Profile</div></Link>
                        <div className="dropdown-item">Log Out</div>
                    </div>
                </div>
            </div>
            <nav aria-label="breadcrumb" className="d-flex justify-content-between align-items-center bg-dark ">
                <ol class="breadcrumb " style={{ backgroundColor: 'transparent', fontSize: '1.5rem', color: '#fff' }}>
                    <li class="breadcrumb-item" aria-current="page">{history.location.pathname.slice(1)}</li>
                </ol>
                <div className="p-2 mx-5 ">
                    <button type="button" className="btn btn-outline-success " style={{ width: 50, height: 30 }} > <i className="fas fa-plus" /> </button>
                </div>
            </nav>

        </div>
    )

}
export default withRouter(AdminNavbar);