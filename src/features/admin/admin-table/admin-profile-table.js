import React, { useState, useEffect, useRef } from 'react'
import { withMedia } from 'react-media-query-hoc'
import Swal from 'sweetalert2'

import KmDataTable from '../../../common/KmDataTable'
import KmModal from '../../../common/KmModal'
import { IMG_SERVER } from '../../../network/api'
import { getAllProfile, deleteAllProfile, editProfile, addNewProfile } from '../../../network/profileFetcher'
import { profilefilterHelper, productfilterHelper } from '../../../helper/filterHelper'

const AdminProfileTable = props => {
    const { media } = props
    const [profile, setProfileData] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const formRef = useRef(null)
    const formRefUpdate = useRef(null)
    const [index, setIndex] = useState(-1)
    const profileNameInput = useRef('')


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data'))
        if (userData === null) {
            props.history.replace('/')
            return null;
        } else {
            getAllProfile((error, data) => {
                if (error) console.log('fetching error', error)
                else setProfileData(data)
            })
        }
    }, [])

    if (profile.length === 0) return null;

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const openModal1 = () => setIsOpen1(true);
    const closeModal1 = () => setIsOpen1(false);

    const validate = () => formRef.current.reportValidity();
    const validateUpdate = () => formRefUpdate.current.reportValidity();
    // function validateEmail (email) {
    //     const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return regexp.test(email);
    //   }

    const handleEditProfile = (index) => {
        openModal();
        const rowData = profile[index]
        setIndex(index)
        setId(rowData.id)
        setName(rowData.name)
        setAddress(rowData.address)
        setMail(rowData.mail)
        setPhone(rowData.phone)
        setImage(rowData.img)
    }

    const updateProfile = (e) => {
        e.preventDefault()

        const isFilter = profilefilterHelper(profile, id, name)
        if (isFilter) {
            profileNameInput.current.focus()
            Swal.fire({
                title: 'Profile Name already exist!',
                text: 'duplicate!',
                icon: 'error'
            })
        } else {
            if (name.length === 0 || address.length === 0 || mail.length === 0 || phone.length === 0) {
                profileNameInput.current.focus();
                Swal.fire({
                    title: 'Edit profile',
                    text: ' not empty value!',
                    icon: 'error'
                })
            } else {
                let info = new FormData()
                info.append('name', name)
                info.append('address', address)
                info.append('mail', mail)
                info.append('phone', phone)
                info.append('profileImage', image)
                const token = JSON.parse(localStorage.getItem('data')).token;
                editProfile({ id, info, token }, (error, data) => {
                    if (error) console.log('fetching error', error)
                    else {
                        Swal.fire({
                            title: 'Edit Profile',
                            text: ' successfully change your profile!',
                            icon: 'success'
                        })
                        setIsOpen(false)
                        // userNameInput.current.focus();
                        setProfileData(data.payload)
                    }
                })
            }
        }
    }
    const handleNewProfile = () => {
        openModal1()
        setId('')
        setName('')
        setAddress('')
        setMail('')
        setPhone('')
        setImage(null)
    }
    const AddNewProfile = (e) => {
        e.preventDefault()
        const isFilter = profilefilterHelper(profile, id, name)
        if (isFilter) {
            Swal.fire({
                title: 'Profile Name already exist!',
                text: 'duplicate!',
                icon: 'error'
            })
        } else {
            let info = new FormData()
            info.append('name', name)
            info.append('address', address)
            info.append('mail', mail)
            info.append('phone', phone)
            info.append('profileImage', image)
            const token = JSON.parse(localStorage.getItem('data')).token;
            addNewProfile({ info, token }, (error, data) => {
                if (error) console.log('fetching error', error)
                else {
                    setProfileData(data.payload.reverse())
                    if (data.success) {
                        Swal.fire({
                            title: 'Add New Profile',
                            text: ' successfully Added!',
                            icon: 'success',
                        })
                        setIsOpen1(false)
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
    }
    const deletProfile = (index) => {
        const rowData = profile[index]
        const id = rowData.id
        const token = JSON.parse(localStorage.getItem('data')).token;
        deleteAllProfile(id, token, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                data.success &&
                    Swal.fire({
                        title: 'Delete Profile',
                        text: ' delete successfully!',
                        // text: data.message,
                        icon: 'success',
                    })
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

    // console.log(image)
    return (
        <div className="container-fluid" style={{ fontSize: 16 }}>
            <div className="p-4 text-center text-dark font-weight-bold" style={{ fontSize: '2rem' }}>
                Profile Page
            </div>
            <div className="d-flex justify-content-end">
                <button type="button"
                    data-toggle="modal" data-target="#NewModal"
                    className="btn btn-outline-success "
                    style={{ width: 100, height: 30, fontSize: '1.5rem', }}
                    onClick={handleNewProfile}
                >
                    <i className="fas fa-plus" /> <span className="px-2">Add New </span>
                </button>
            </div>

            <KmDataTable data={TableData} />
            {/* ================================edit profile=================================================================================================== */}
            <KmModal isOpen={isOpen}>
                <form ref={formRefUpdate} onSubmit={e => updateProfile(e)}>
                    <div className="d-flex justify-content-between py-2">
                        <h4 >{"EDIT PROFILE"}</h4>
                        <button className='btn' onClick={closeModal}><i className="fa fa-times" /></button>
                    </div>
                    <div className="py-2">
                        <input className="form-control"
                            ref={profileNameInput}
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="text" placeholder="Name"
                            onChange={(e) => setName(e.currentTarget.value)}
                            value={name}
                            autoFocus={true}
                        />
                    </div>
                    <div className="py-2" >
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="text" placeholder="Address"
                            onChange={(e) => setAddress(e.currentTarget.value)}
                            value={address} />
                    </div>
                    <div className="py-2" >
                        {/* abc@example.com # Minimum three characters
    ABC.xyz@example.com # Accepts Caps as well.
    abce.xyz@example.co.in # Accepts . before @ */}
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="email" placeholder="Mail"
                            onChange={(e) => setMail(e.currentTarget.value)}
                            pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
                            value={mail}
                        />
                    </div>
                    <div className="py-2" >
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="text" placeholder="Phone"
                            onChange={(e) => setPhone(e.currentTarget.value)}
                            value={phone}
                            pattern="[0-9]*"
                        // pattern="[0-9]{9}"
                        // max={10}
                        // min={1}
                        // pattern="^[0]{1}[9]{1}[0-9]{9}$"
                        />
                    </div>
                    <div className="py-2" >
                        {
                            image === null || image === undefined
                                ? <img src={`${IMG_SERVER}/${index === -1 ? image : profile[index].img}`} className="img-thumbnail w-100" />
                                : typeof image === 'string'
                                    ? <img src={`${IMG_SERVER}/${image}`} className="img-thumbnail w-100" />
                                    : <img src={URL.createObjectURL(image)} className="img-thumbnail w-100" />
                        }
                        <label htmlFor="upload-photo" style={fileStyle}>Upload Image</label>
                        <input type="file" name="photo"
                            id="upload-photo"
                            style={photoStyle}
                            onChange={e => setImage(e.target.files[0])}
                            accept="image/*"

                        />
                    </div>
                    <div className="py-2 d-flex justify-content-end">
                        <button className="btn btn-primary py-2 px-4 mr-2" style={{ fontSize: 14 }}
                            onClick={validateUpdate}
                        >
                            <span><i className="fa fa-edit"></i></span>Save
                        </button>
                        <button className="btn btn-warning py-2 px-4" style={{ fontSize: 14 }} onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </KmModal>

            {/* =========================insert modal========================================================================== */}
            <KmModal isOpen={isOpen1}>
                <form ref={formRef} onSubmit={e => AddNewProfile(e)}>
                    <div className="d-flex justify-content-between py-2">
                        <h4 >{"ADD NEW PROFILE"}</h4>
                        <button className='btn' onClick={closeModal1}><i className="fa fa-times" /></button>
                    </div>
                    <div className="py-2">
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="text" placeholder="Name"
                            onChange={(e) => setName(e.currentTarget.value)}
                            value={name}
                            ref={profileNameInput}
                            autoFocus={true}
                            required
                        />
                    </div>
                    <div className="py-2" >
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="text" placeholder="Address"
                            onChange={(e) => setAddress(e.currentTarget.value)}
                            value={address}
                            required
                        />
                    </div>
                    <div className="py-2" >
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="email" placeholder="Mail"
                            onChange={(e) => setMail(e.currentTarget.value)}
                            value={mail}
                            pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
                            required
                        />
                    </div>
                    <div className="py-2" >
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="text" placeholder="Phone"
                            onChange={(e) => setPhone(e.currentTarget.value)}
                            value={phone}
                            pattern="[0-9]*"
                            required
                        // pattern="^[0]{1}[9]{1}[0-9]{9}$"
                        />
                    </div>
                    <div className="py-2" >
                        {/* <img src={`${IMG_SERVER}/${image}`} className="img-thumbnail w-100" /> */}
                        <label htmlFor="upload-photo" style={fileStyle}>Upload Image</label>
                        <input type="file" name="photo"
                            id="upload-photo"
                            style={photoStyle}
                            onChange={e => setImage(e.target.files[0])}
                            accept="image/*"
                            required
                        />
                        {
                            image === null || image === undefined
                                ? <img src={'images/emptyImage.png'} className="img-thumbnail w-100" />
                                : typeof image === 'string'
                                    ? <img src={`/${IMG_SERVER}/${image}`} className="img-thumbnail w-100" />
                                    : <img src={URL.createObjectURL(image)} className="img-thumbnail w-100" />
                        }
                    </div>
                    <div className="py-2 d-flex justify-content-end">
                        <button className="btn btn-primary py-2 px-4 mr-2" style={{ fontSize: 14 }} onClick={validate}>
                            <span><i className="fa fa-edit"></i></span>Save
                        </button>
                        <button className="btn btn-warning py-2 px-4" style={{ fontSize: 14 }} onClick={closeModal1}>Cancel</button>
                    </div>
                </form>
            </KmModal>

        </div>
    )
}

export default withMedia(AdminProfileTable)

const fileStyle = {
    display: "flex",
    background: '#da3b4a',
    color: 'white',
    width: '100%',
    height: '40px',
    // padding: '9px 0px',
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    marginTop: '11px',
    cursor: 'pointer',

}
const photoStyle = {
    opacity: 0,
    position: 'absolute',
    zIndex: -1,
}