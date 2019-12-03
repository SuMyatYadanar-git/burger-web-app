import React, { useState, useEffect } from 'react'
import { withMedia } from 'react-media-query-hoc'
import { memoize } from 'react-data-table-component'

import tableTheme from "../../../common/TableThems"
import KmTable from '../../../common/KmTable'
import KmDataTable from '../../../common/KmDataTable'
// import Mybtn from '../../../common/myButton'
import { IMG_SERVER } from '../../../network/api'
import { getAllProfile, deleteAllProfile, editProfile, addNewProfile } from '../../../network/profileFetcher'

const AdminProfileTable = props => {
    const { media } = props
    const [profile, setProfileData] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState(null)

    const token = JSON.parse(localStorage.getItem('data')).token;

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data'))
        if (userData === null) {
            props.history.replace('/')
        } else {
            getAllProfile((error, data) => {
                if (error) console.log('fetching error', error)
                else setProfileData(data)
            })
        }
    }, [])

    // const handleDeleteProfile = (row) => {
    //     const token = JSON.parse(localStorage.getItem('data')).token
    //     let info = {
    //         id: row.id,
    //         token: token
    //     }
    //     deleteAllProfile(info, (error, data) => {
    //         if (error) console.log('fetching error', error)
    //         else {
    //             data.success === true && alert('delete successfully')
    //             setProfileData(data.payload)
    //         }
    //     })
    // }

    // if (profile.length === 0 ) return null;

    const handleEditProfile = (index) => {
        const rowData = profile[index]
        setId(rowData.id)
        setName(rowData.name)
        setAddress(rowData.address)
        setMail(rowData.mail)
        setPhone(rowData.phone)
        setImage(rowData.img)
    }

    const updateProfile = (e) => {
        e.preventDefault()
        let info = new FormData()
        info.append('name', name)
        info.append('address', address)
        info.append('mail', mail)
        info.append('phone', phone)
        info.append('profileImage', image)
        editProfile({ id, info ,token}, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                const modals = document.getElementById('updateProfileModal')
                const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                modals.classList.remove('show')
                document.body.removeChild(modalBackdrops[1]);
                setProfileData(data.payload)
            }
        })
    }
    const AddNewProfile = (e) => {
        e.preventDefault()
        let info = new FormData()
        info.append('name', name)
        info.append('address', address)
        info.append('mail', mail)
        info.append('phone', phone)
        info.append('profileImage', image)
        addNewProfile({ info,token }, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                const modals = document.getElementById('NewModal')
                const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                modals.classList.remove('show')
                document.body.removeChild(modalBackdrops[1]);
                setProfileData(data.payload)
                if(data.success){
                    setId('')
                    setName('')
                    setAddress('')
                    setMail('')
                    setPhone('')
                    setImage(null) 
                }
            }
        })
    }
    const deletProfile = (index) => {
        const rowData = profile[index]
        const id = rowData.id
        deleteAllProfile(id,token, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                data.success && alert('delete done!')
                setProfileData(data.payload)
            }
        })
    }

    const dataRow = profile.reduce((r, c, i) => {
        c.image = <img className="img-thumbnail" alt='Profile' style={{ height: 75, width: 75 }} src={`${IMG_SERVER}/${c.img}`} />
        c.update = <button data-toggle="modal" data-target="#updateProfileModal" className="btn btn-primary py-3 px-5" onClick={() => handleEditProfile(i)} style={{ fontSize: 15 }}><span><i className="fa fa-edit">Update</i></span></button>
        c.delete = <button className="btn btn-danger py-3 px-5" onClick={() => deletProfile(i)} style={{ fontSize: 15 }}><span><i className="fa fa-trash">Delete</i></span></button>
        return [...r, c]
    }, [])

    const TableData = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Address',
                field: 'address',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Mail',
                field: 'mail',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Phone',
                field: 'phone',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Photo',
                field: 'image',
                sort: 'asc',
                width: 150
            },
            {
                label: '',
                field: 'update',
                width: 150
            },
            {
                label: '',
                field: 'delete',
                width: 150
            }
        ],
        rows: dataRow
    };


    return (
        <div className="container-fluid" style={{ fontSize: 16 }}>
            <div className="d-flex justify-content-end">
                <button type="button"
                    data-toggle="modal" data-target="#NewModal"
                    className="btn btn-outline-success "
                    style={{ width: 100, height: 30, fontSize: '1.5rem', }}
                    onClick={() => null}
                >
                    <i className="fas fa-plus" /> <span className="px-2">Add New </span>
                </button>
            </div>

            <KmDataTable data={TableData} />

            <form className="modal fade" id="updateProfileModal" onSubmit={e => updateProfile(e)}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{"EDIT PROFILE"}</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Name" onChange={(e) => setName(e.currentTarget.value)} value={name} required />
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Address" onChange={(e) => setAddress(e.currentTarget.value)} value={address} required />
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Mail" onChange={(e) => setMail(e.currentTarget.value)} value={mail} required />
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Phone" onChange={(e) => setPhone(e.currentTarget.value)} value={phone} required />
                        </div>
                        <div className="modal-body row px-3 m-0" style={{ height: 100 }}>
                            <input type="file" name="profileImage" onChange={e => setImage(e.target.files[0])}
                                style={{ height: 40, fontSize: '1.5rem' }} className="form-control col-6"
                                accept=".jpg,.JPEG,.png,.PNG,.gif,.GIF,.tiff,.TIFF"
                            />
                        </div>
                        <div className="modal-footer py-4">
                            <button className="btn btn-primary py-2 px-4" style={{ fontSize: 14 }} > <span><i className="fa fa-edit"></i></span>Save</button>
                            <button className="btn btn-warning py-2 px-4" data-dismiss="modal" style={{ fontSize: 14 }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
            {/* =================================================================================================== */}

            <form className="modal fade" id="NewModal" onSubmit={e => AddNewProfile(e)}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{"ADD NEW PROFILE"}</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Name" onChange={(e) => setName(e.currentTarget.value)} value={name} required />
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Address" onChange={(e) => setAddress(e.currentTarget.value)} value={address} required />
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Mail" onChange={(e) => setMail(e.currentTarget.value)} value={mail} required />
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Phone" onChange={(e) => setPhone(e.currentTarget.value)} value={phone} required />
                        </div>
                        <div className="modal-body row px-3 m-0" style={{ height: 100 }}>
                            <input type="file" name="profileImage" onChange={e => setImage(e.target.files[0])}
                                style={{ height: 40, fontSize: '1.5rem' }} className="form-control col-6"
                                accept=".jpg,.JPEG,.png,.PNG,.gif,.GIF,.tiff,.TIFF"
                                required
                            />
                        </div>
                        <div className="modal-footer py-4">
                            <button className="btn btn-primary py-2 px-4" style={{ fontSize: 14 }} > <span><i className="fa fa-edit"></i></span>Save</button>
                            <button className="btn btn-warning py-2 px-4" data-dismiss="modal" style={{ fontSize: 14 }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default withMedia(AdminProfileTable)