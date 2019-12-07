import React, { useState, useEffect } from 'react'
import { withMedia } from 'react-media-query-hoc'
import Swal from 'sweetalert2'
import { getAllCategory, deleteAllCategory, editCategory, addNewCategory } from '../../../network/categoryFetcher'
import { categoryfilterHelper } from '../../../helper/filterHelper'
import { IMG_SERVER } from '../../../network/api'
import KmDataTable from '../../../common/KmDataTable'
import KmModal from '../../../common/KmModal'

const AdminCategoryTable = props => {
    const [category, setCategory] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState(null)
    const [categoryId, setCategoryId] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const [index, setIndex] = useState(-1)

    // let fileUpload = null
    const { media } = props
    const token = JSON.parse(localStorage.getItem('data')).token;

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data'))
        if (userData === null) {
            props.history.replace('/')
        } else {
            getAllCategory((error, data) => {
                if (error) console.error(error)
                else setCategory(data)
            })
        }
    }, [])
    if (category.length === 0) return null;

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const openModal1 = () => setIsOpen1(true);
    const closeModal1 = () => setIsOpen1(false);

    const handleDeleteCategory = (index) => {
        const rowData = category[index]
        const id = rowData.c_id
        deleteAllCategory(id, token, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                data.success &&
                    Swal.fire({
                        title: 'Delete category',
                        text: ' delete successfully!',
                        icon: 'success',
                    })
                setCategory(data.payload)
            }
        })
    }

    const handleEditCategory = (index) => {
        openModal();
        const rowData = category[index]
        setIndex(index)
        setCategoryName(rowData.c_name)
        setCategoryImage(rowData.c_img)
        setCategoryId(rowData.c_id)
    }

    const updateCategory = (e) => {
        e.preventDefault();
        const isFilter = categoryfilterHelper(category, categoryId, categoryName)
        if (isFilter) {
            Swal.fire({
                title: 'Category already exist!',
                text: 'duplicate!',
                icon: 'error'
            })
        } else {
            let info = new FormData();
            info.append('name', categoryName);
            info.append('categoryImage', categoryImage);
            editCategory({ categoryId, info, token }, (error, data) => {
                if (error) console.log('fetching error', error)
                else {
                    Swal.fire({
                        title: 'Edit Category',
                        text: ' successfully change your category!',
                        icon: 'success'
                    })
                    setIsOpen(false)
                    setCategory(data.payload)
                }
            })
        }

    }
    const handleNewCategory = () => {
        openModal1()
        setCategoryName('')
        setCategoryImage(null)
        setCategoryId('')
    }
    const AddNewCategory = (e) => {
        e.preventDefault()
        const isFilter = categoryfilterHelper(category, categoryId, categoryName)
        if (isFilter) {
            Swal.fire({
                title: ' Category  already exist!',
                text: 'duplicate!',
                icon: 'error'
            })
        } else {
            let info = new FormData();
            info.append('name', categoryName);
            info.append('categoryImage', categoryImage);
            addNewCategory({ info, token }, (error, data) => {
                if (error) console.log('fetching error', error)
                else {
                    setCategory(data.payload.reverse())
                    if (data.success) {
                        Swal.fire({
                            title: 'Add New Category',
                            text: ' successfully Added!',
                            icon: 'success',
                        })
                        setIsOpen1(false)
                        setCategoryName('')
                        setCategoryImage(null)
                        setCategoryId('')
                    }
                }
            })
        }

    }

    const dataRow = category.reduce((r, c, i) => {
        c.image = <img className="img-thumbnail" alt='category' style={{ height: 75, width: 75 }} src={`${IMG_SERVER}/${c.c_img}`} />
        c.update = <button data-toggle="modal" data-target="#updateModal" className="btn btn-primary py-3 px-5" onClick={() => handleEditCategory(i)} style={{ fontSize: 15 }}><span><i className="fa fa-edit">Update</i></span></button>
        c.delete = <button className="btn btn-danger py-3 px-5" onClick={() => handleDeleteCategory(i)} style={{ fontSize: 15 }}><span><i className="fa fa-trash">Delete</i></span></button>
        return [...r, c]
    }, [])

    const TableData = {
        columns: [
            {
                label: 'Photo',
                field: 'image',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Category Name',
                field: 'c_name',
                sort: 'asc',
                width: 270
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
        <div className="container" style={{ fontSize: 16 }}>
            <div className="p-4 text-center text-dark font-weight-bold" style={{ fontSize: '2rem' }}>
                Category Page
            </div>
            <div className="d-flex justify-content-end">
                <button type="button"
                    className="btn btn-outline-success "
                    style={{ width: 100, height: 30, fontSize: '1.5rem', }}
                    onClick={handleNewCategory}
                >
                    <i className="fas fa-plus" /> <span className="px-2">Add New </span>
                </button>
            </div>

            <KmDataTable data={TableData} />

            <KmModal isOpen={isOpen}>
                <div className="d-flex justify-content-between py-2">
                    <h4 >{"EDIT CATEGORY"}</h4>
                    <button className='btn' onClick={closeModal}><i className="fa fa-times" /></button>
                </div>
                <div className="py-2">
                    <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Category" onChange={(e) => setCategoryName(e.currentTarget.value)} value={categoryName} required />
                </div>
                <div className="py-2" >
                    {
                        // categoryImage === null ?
                        //     <img src={`${IMG_SERVER}/${categoryImage}`} className="img-thumbnail w-100" /> :
                        //     typeof categoryImage === "string" ?
                        //         <img src={`${IMG_SERVER}/${categoryImage}`} className="img-thumbnail w-100" />
                        //         :
                        //         <img src={URL.createObjectURL(categoryImage)} className="img-thumbnail w-100" />
                        categoryImage === null || categoryImage === undefined
                            ? <img src={`${IMG_SERVER}/${index === -1 ? categoryImage : category[index].c_img}`} className="img-thumbnail w-100" />
                            : typeof categoryImage === 'string'
                                ? <img src={`${IMG_SERVER}/${categoryImage}`} className="img-thumbnail w-100" />
                                : <img src={URL.createObjectURL(categoryImage)} className="img-thumbnail w-100" />
                    }
                    <label htmlFor="upload-photo" style={fileStyle}>Upload Image</label>
                    <input type="file" name="photo"
                        id="upload-photo"
                        style={photoStyle}
                        onChange={e => setCategoryImage(e.target.files[0])}
                        accept="image/*"
                        required
                    />
                </div>
                <div className="py-2 d-flex justify-content-end">
                    <button className="btn btn-primary py-2 px-4 mr-2" style={{ fontSize: 14 }} onClick={e => updateCategory(e)}>
                        <span><i className="fa fa-edit"></i></span>Save
                        </button>
                    <button className="btn btn-warning py-2 px-4" style={{ fontSize: 14 }} onClick={closeModal}>Cancel</button>
                </div>
            </KmModal>
            {/* ============================================================================================================================== */}
            {/* insert modal category */}
            <KmModal isOpen={isOpen1}>
                <form onSubmit={e => AddNewCategory(e)}>
                    <div className="d-flex justify-content-between py-2">
                        <h4 >{"ADD NEW CATEGORY"}</h4>
                        <button className='btn' onClick={closeModal1}><i className="fa fa-times" /></button>
                    </div>

                    <div className="py-2">
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="text" placeholder="Category"
                            onChange={(e) => setCategoryName(e.currentTarget.value)}
                            value={categoryName}
                            required
                        />
                    </div>
                    <div className="py-2" >
                        <label htmlFor="upload-photo" style={fileStyle}>Upload Image</label>
                        <input type="file" name="photo"
                            id="upload-photo"
                            style={photoStyle}
                            onChange={e => setCategoryImage(e.target.files[0])}
                            accept="image/*"
                            required
                        />
                        {
                            // categoryImage === null || categoryImage === undefined
                            //     ?
                            //     <img src={'images/emptyImage.png'} className="img-thumbnail w-100" />
                            //     :
                            // typeof categoryImage === "string"
                            //     ?
                            //     <img src={`${IMG_SERVER}/${categoryImage}`} className="img-thumbnail w-100" />
                            //     : typeof categoryImage === "object"
                            //         ? <img src={URL.createObjectURL(categoryImage)} className="img-thumbnail w-100" />
                            //         :
                            categoryImage === null || categoryImage === undefined
                                ? <img src={'images/emptyImage.png'} className="img-thumbnail w-100" />
                                : typeof categoryImage === 'string'
                                    ? <img src={`${IMG_SERVER}/${categoryImage}`} className="img-thumbnail w-100" />
                                    : <img src={URL.createObjectURL(categoryImage)} className="img-thumbnail w-100" />

                        }
                    </div>
                    <div className="py-2 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary py-2 px-4 mr-2" style={{ fontSize: 14 }} >
                            <span><i className="fa fa-edit"></i></span>Save
                        </button>
                        <button className="btn btn-warning py-2 px-4" style={{ fontSize: 14 }} onClick={closeModal1}>Cancel</button>
                    </div>
                </form>
            </KmModal>

        </div >
    )
}

export default withMedia(AdminCategoryTable)

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
