import React, { useState, useEffect } from 'react'
import { withMedia } from 'react-media-query-hoc'
import { memoize } from 'react-data-table-component'
import KmDataTable from '../../../common/KmDataTable'

import tableTheme from "../../../common/TableThems"
import KmTable from '../../../common/KmTable'
import Mybtn from '../../../common/myButton'

import { IMG_SERVER } from '../../../network/api'
import { getAllProduct, deleteAllProduct, editProduct } from '../../../network/productFetcher'


const AdminProductTable = props => {
    const { media } = props
    const [products, setProduct] = useState([])
    const [id, setId] = useState('')
    const [productImage, setproductImage] = useState(null)
    const [productName, setproductName] = useState('')
    const [productPrice, setproductPrice] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data'))
        if (userData === null) {
            props.history.replace('/')
        } else {
            getAllProduct((error, data) => {
                if (error) console.log("fetch errror", error)
                else setProduct(data)
            })
        }
    }, [])

    if (products.length === 0) return null;

    // const data = products.map(v => ({
    //     id: v.p_id,
    //     image: v.p_img,
    //     name: v.p_name,
    //     price: v.p_price,
    //     description: v.description
    // })
    // )
    const handleDeleteProduct = (row) => {
        const id = row.id
        const token = JSON.parse(localStorage.getItem('data')).token
        let info = {
            id: id,
            token: token
        }
        deleteAllProduct(info, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                data.success === true && alert('delete successfully')
                setProduct(data.payload)
            }
        })
    }
    const handleEditProduct = (index) => {
        const rowData = products[index]
        setId(rowData.p_id)
        setproductImage(rowData.p_img)
        setproductName(rowData.p_name)
        setproductPrice(rowData.p_price)
        setDescription(rowData.description)
    }
    const updateProduct = () => {
        let info = new FormData();
        info.append('name', productName);
        info.append('price', productPrice);
        info.append('description', description);
        info.append('productImage', productImage)
        editProduct({ id, info }, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                const modals = document.getElementById('updateProductModal')
                const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                modals.classList.remove('show')
                document.body.removeChild(modalBackdrops[1]);
                setProduct(data.payload)
            }

        })
    }
    const deleteProduct = (index) => {
        const rowData = products[index]
        const id = rowData.p_id
        deleteAllProduct(id, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                data.success && alert('delete done!')
                setProduct(data.payload)
            }
        })
    }
    
    const dataRow = products.reduce((r, c, i) => {
        c.image = <img className="img-thumbnail" alt='Product' style={{ height: 75, width: 75 }} src={`${IMG_SERVER}/${c.p_img}`} />
        c.update = <button data-toggle="modal" data-target="#updateProductModal" className="btn btn-primary py-3 px-5" onClick={() => handleEditProduct(i)} style={{ fontSize: 15 }}><span><i className="fa fa-edit">Update</i></span></button>
        c.delete = <button className="btn btn-danger py-3 px-5" onClick={() => deleteProduct(i)} style={{ fontSize: 15 }}><span><i className="fa fa-trash">Delete</i></span></button>
        return [...r, c]
    }, [])

    const TableData = {
        columns: [
            {
                label: ' Name',
                field: 'p_name',
                sort: 'asc',
                width: 270
            },
            {
                label: 'price',
                field: 'p_price',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Description',
                field: 'description',
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
        <div className="container-fluid">
            <KmDataTable data={TableData} />
            <div className="modal fade" id="updateProductModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{"EDIT PRODUCT"}</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Name" onChange={(e) => setproductName(e.currentTarget.value)} value={productName} required />
                        </div>
                        <div className="modal-body">
                            <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Price" onChange={(e) => setproductPrice(e.currentTarget.value)} value={productPrice} required />
                        </div>
                        <div className="modal-body">
                            <textarea
                                className='form-control mb-4'
                                rows="3"
                                style={{ height: 40, fontSize: '1.5rem', minHeight: '80px', maxHeight: '80px' }}
                                placeholder={'Description'}
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                required
                            />
                            {/* <input className="form-control" style={{ height: 40, fontSize: '1.5rem' }} type="text" placeholder="Description" onChange={(e) => setDescription(e.currentTarget.value)} value={description} required /> */}
                        </div>
                        <div className="modal-body row px-3 m-0" style={{ height: 100 }}>
                            <input type="file" name="productImage" onChange={e => setproductImage(e.target.files[0])}
                                style={{ height: 40, fontSize: '1.5rem' }} className="form-control col-6"
                                accept=".jpg,.JPEG,.png,.PNG,.gif,.GIF,.tiff,.TIFF"
                            />
                        </div>

                        <div className="modal-footer py-4">
                            <button className="btn btn-primary py-2 px-4" style={{ fontSize: 14 }} onClick={updateProduct}> <span><i className="fa fa-edit"></i></span>Save</button>
                            <button className="btn btn-warning py-2 px-4" data-dismiss="modal" style={{ fontSize: 14 }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <KmTable
                columns={columns(media, handleDeleteProduct, handleEditProduct)}
                data={data}
                keyField={"id"}
                defaultSortField={"id"}
                highlightOnHover={true}
                style={{ borderRadius: 6, whiteSpace: 'nowrap', }}
                customTheme={tableTheme(media)}
                pagination={true}
                paginationDefaultPage={1}
                paginationTotalRows={data.length}
                paginationPerPage={5}
                customPagination={true}
            /> */}

        </div>
    )
}
export default withMedia(AdminProductTable);

const columns = memoize((media, handleDeleteProduct, handleEditProduct) =>
    [
        {
            name: 'Image',
            selector: 'image',
            sortable: true,
            minWidth: '200px',
            cell: row =>
                // <div className="border border-danger"> 
                <img src={IMG_SERVER + '/uploads/' + row.image} className=" img-thumbnail " width={120} />
            //   </div>
            // <div style={{ color: '#153784', fontWeight: 700, textAlign: 'center' }}>{row.image}</div>
        },
        {
            name: 'Product Name',
            selector: 'name',
            sortable: true,
            right: true,
            //  minWidth: '120px',
        },
        {
            name: 'Product Price',
            selector: 'price',
            sortable: true,
            right: true,
            //  minWidth: '120px',
        },
        {
            name: ' Product Description',
            selector: 'description',
            sortable: true,
            right: true,
            // minWidth: '250px',
        },
        {
            name: '',
            selector: '',
            right: true,
            minWidth: '200px',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => {
                return (
                    <div
                        onClick={() => handleEditProduct(row)}
                        style={{ textAlign: 'right', cursor: 'pointer', color: '#a3a3a2', borderRadius: 6 }}
                        className="p-3 bg-primary text-light"
                    >
                        EDIT
                        </div>
                )
            }
        },
        {
            name: '',
            selector: '',
            right: true,
            minWidth: '100px',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => {
                return (
                    <div
                        onClick={() => handleDeleteProduct(row)}
                        style={{ textAlign: 'right', cursor: 'pointer', color: '#a3a3a2', borderRadius: 6 }}
                        className="p-3 bg-danger text-light"
                    >
                        DELETE
                         </div>
                )
            }
        },
    ]);