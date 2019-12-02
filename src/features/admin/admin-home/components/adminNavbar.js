import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { GetloginData } from '../../../../network/userFetcher'
import KmLogo from '../../../../Images/kumo_Logo.png'
import KmModal from '../../../../common/KmModal'
import * as route from '../../../../config/route.config'

const AdminNavbar = props => {
    const { history } = props
    const [loginName, setloginNmae] = useState('admin')
    const [modalOpen, setModalOpen] = useState(false)

    //  const data = JSON.parse(localStorage.getItem('data'))
    // const id = JSON.parse(localStorage.getItem('data')).payload[0].id

    const openModal = () => setModalOpen(true)
    const closeModal = () => {
        setModalOpen(false);
        // setSelectedRow(initialSelectedRow);
    }

    const _onClickLogout = () => {
        localStorage.removeItem('data');
        props.history.replace(`/${route.admin}`)
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data'))
        if (userData === null) {
            props.history.replace('/')
        } else {
            const id = userData.payload[0].id
            GetloginData(id, (error, data) => {
                if (error) console.error('fetch error', error)

                else setloginNmae(data[0].user_name)
                // setloginNmae('admin')
            })
        }
    }, [])

    return (
        <div className="container-fluid p-0">
            <div className="d-flex flex-row justify-content-between p-4 bg-warning">

                <div className="dropdown dropright" >
                    <button style={{ fontSize: '1.5rem' }} className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="px-4 font-weight-bold"> {loginName} </span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ fontSize: '1.8rem' }}>
                        <Link to='/admin-category' style={{ textDecoration: 'none' }}> <div className="dropdown-item">Category</div> </Link>
                        <div className="dropdown-divider" />
                        <Link to='/admin-product' style={{ textDecoration: 'none' }}><div className="dropdown-item">Product</div> </Link>
                        <div className="dropdown-divider" />
                        <Link to='/admin-profile' style={{ textDecoration: 'none' }}> <div className="dropdown-item">Profile</div></Link>
                        <div className="dropdown-divider" />
                        <Link to='/user' style={{ textDecoration: 'none' }}> <div className="dropdown-item">User</div></Link>
                        <div className="dropdown-divider" />
                        <div className="dropdown-item"
                            onClick={() => _onClickLogout()}
                            style={{ cursor: 'pointer' }}
                        >
                            Log Out
                             </div>
                    </div>
                </div>

                <div><img src={KmLogo} className="img-fluid" width={50} /></div>
            </div>
            <nav aria-label="breadcrumb" className="d-flex justify-content-between align-items-center ">
                <ol className="breadcrumb " style={{ backgroundColor: 'transparent', fontSize: '1.5rem', }}>
                    <li className="breadcrumb-item text-dark" aria-current="page">{history.location.pathname.slice(1)}</li>
                </ol>
                <div className="p-2 mx-5 ">
                    <button type="button"
                        className="btn btn-outline-success "
                        style={{ width: 100, height: 30, fontSize: '1.5rem', }}
                        onClick={() => openModal()}
                    >
                        <i className="fas fa-plus" /> <span className="px-2">Add New </span>
                    </button>
                    <KmModal
                        isOpen={modalOpen}
                        // onAfterOpen={this.afterOpenModal}
                        onRequestClose={closeModal}
                        // style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <h3>{`Regirster On`}</h3>
                        <button onClick={closeModal}>close</button>
                    </KmModal>
                </div>
            </nav>

        </div>
    )

}
export default withRouter(AdminNavbar);