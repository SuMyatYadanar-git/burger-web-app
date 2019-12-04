import React, { useState, useEffect } from 'react'
import { withMedia } from 'react-media-query-hoc'
import Swal from 'sweetalert2'
import { getAllCategory, deleteAllCategory, editCategory, addNewCategory } from '../../../network/categoryFetcher'
import { IMG_SERVER } from '../../../network/api'
import KmDataTable from '../../../common/KmDataTable'

const AdminCategoryTable = props => {
    const [category, setCategory] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState(null)
    const [categoryId, setCategoryId] = useState('')

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
                        // text: data.message,
                        icon: 'success',
                    })
                setCategory(data.payload)
            }
        })
    }
    const handleEditCategory = (index) => {
        const rowData = category[index]
        setCategoryName(rowData.c_name)
        setCategoryImage(rowData.c_img)
        setCategoryId(rowData.c_id)
    };
    const updateCategory = (e) => {
        e.preventDefault()
        let info = new FormData();
        info.append('name', categoryName);
        info.append('categoryImage', categoryImage);
        editCategory({ categoryId, info, token }, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                const modals = document.getElementById('updateModal')
                const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                modals.classList.remove('show')
                document.body.removeChild(modalBackdrops[1]);
                Swal.fire({
                    title: 'Edit Category',
                    text: ' successfully change your category!',
                    icon: 'success'
                    // text: data.message,
                })
                setCategory(data.payload)
            }
        })
    }
    const handleNewCategory = () => {
        setCategoryName('')
        setCategoryImage(null)
        setCategoryId('')
    }
    const AddNewCategory = (e) => {
        e.preventDefault()
        let info = new FormData();
        info.append('name', categoryName);
        info.append('categoryImage', categoryImage);
        addNewCategory({ info, token }, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                const modals = document.getElementById('NewModal')
                const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                modals.classList.remove('show')
                document.body.removeChild(modalBackdrops[1]);
                setCategory(data.payload)
                if (data.success) {
                    Swal.fire({
                        title: 'Add New Category',
                        text: ' successfully Added!',
                        // text: data.message,
                        icon: 'success',
                    })
                    setCategoryName('')
                    setCategoryImage(null)
                    setCategoryId('')
                }
            }
        })

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
                    data-toggle="modal" data-target="#NewModal"
                    className="btn btn-outline-success "
                    style={{ width: 100, height: 30, fontSize: '1.5rem', }}
                    onClick={handleNewCategory}
                >
                    <i className="fas fa-plus" /> <span className="px-2">Add New </span>
                </button>
            </div>

            <KmDataTable data={TableData} />


            <form className="modal fade" id="updateModal" onSubmit={(e) => updateCategory(e)}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{"EDIT CATEGORY"}</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Category" onChange={(e) => setCategoryName(e.currentTarget.value)} value={categoryName} />
                        </div>
                        <div className="modal-body row px-3 m-0" style={{ height: 100 }}>
                            <input type="file" name="categoryImage" onChange={e => setCategoryImage(e.target.files[0])}
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
            {/* ============================================================================================================================== */}
            {/* insert modal category */}
            <form className="modal fade" id="NewModal" onSubmit={e => AddNewCategory(e)}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{"ADD NEW CATEGORY"}</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control"
                                style={{ height: 40, fontSize: '1.5rem' }}
                                type="text" placeholder="Add New Category"
                                onChange={(e) => setCategoryName(e.currentTarget.value)}
                                value={categoryName}
                                required
                            />
                        </div>
                        <div className="modal-body row px-3 m-0" style={{ height: 100 }}>
                            <input type="file" name="categoryImage" onChange={e => setCategoryImage(e.target.files[0])}
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
        </div >
    )
}

export default withMedia(AdminCategoryTable)