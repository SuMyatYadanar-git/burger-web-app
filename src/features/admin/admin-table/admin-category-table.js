import React, { useState, useEffect } from 'react'
import { withMedia } from 'react-media-query-hoc'
import { memoize } from 'react-data-table-component'

import tableTheme from "../../../common/TableThems"
import KmTable from '../../../common/KmTable'
import KmModal from '../../../common/KmModal'
import { MDBBtn, MDBInput, MDBDataTable, MDBContainer } from "mdbreact";
import { getAllCategory, deleteAllCategory, editCategory } from '../../../network/categoryFetcher'
import { IMG_SERVER } from '../../../network/api'
import KmDataTable from '../../../common/KmDataTable'

const AdminCategoryTable = props => {
    const [category, setCategory] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState(null)
    const [categoryId, setCategoryId] = useState('')

    const { media } = props
    // const token = JSON.parse(localStorage.getItem('data')).token;

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

    const handleDeleteCategory = (index) => console.log(index)

    const handleEditCategory = (index) => {
        const rowData = category[index]

        setCategoryName(rowData.c_name)
        setCategoryImage(rowData.c_img)
        setCategoryId(rowData.c_id)
        // updateCategory((error,data)=>{

        // })
    };

    const updateCategory = () => {
        let info = new FormData();
        info.append('name', categoryName);
        info.append('categoryImage', categoryImage);

        editCategory({ categoryId, info }, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                const modals = document.getElementById('updateModal')
                const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                modals.classList.remove('show')
                document.body.removeChild(modalBackdrops[1]);             
                setCategory(data.payload)
            }
        })
    }

    const dataRow = category.reduce((r, c, i) => {
        c.image = <img className="img-thumbnail" alt='Product' style={{ height: 75, width: 75 }} src={`${IMG_SERVER}/${c.c_img}`} />
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

            <KmDataTable data={TableData} />

            <div className="modal fade" id="updateModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{"Add Category"}</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={null}>×</button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Category" onChange={(e) => setCategoryName(e.currentTarget.value)} value={categoryName} required />
                        </div>
                        <div className="modal-body row px-3 m-0" style={{ height: 100 }}>
                            <input type="file" name="categoryImage" onChange={e => setCategoryImage(e.target.files[0])}
                                style={{ height: 40, fontSize: '1.5rem' }} className="form-control col-6"
                                accept=".jpg,.JPEG,.png,.PNG,.gif,.GIF,.tiff,.TIFF"
                            />
                        </div>
                        <div className="modal-footer py-4">
                            <button className="btn btn-primary py-2 px-4" style={{ fontSize: 14 }} onClick={updateCategory}> <span><i className="fa fa-edit"></i></span>Save</button>
                            <button className="btn btn-warning py-2 px-4" data-dismiss="modal" style={{ fontSize: 14 }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default withMedia(AdminCategoryTable)