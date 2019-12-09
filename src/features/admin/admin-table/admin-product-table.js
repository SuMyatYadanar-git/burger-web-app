import React, { useState, useEffect, useRef } from 'react'
import { withMedia } from 'react-media-query-hoc'
import Swal from 'sweetalert2'

import KmDataTable from '../../../common/KmDataTable'
import KmModal from '../../../common/KmModal'
import { IMG_SERVER } from '../../../network/api'
import { getAllProduct, deleteAllProduct, editProduct, addNewProduct } from '../../../network/productFetcher'
import { productfilterHelper } from '../../../helper/filterHelper'


const AdminProductTable = props => {
    const { media } = props
    const [products, setProduct] = useState([])
    const [id, setId] = useState('')
    const [productImage, setproductImage] = useState(null)
    const [productName, setproductName] = useState('')
    const [productPrice, setproductPrice] = useState('')
    const [description, setDescription] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const [index, setIndex] = useState(-1)
    const productNameInput = useRef()

    if (JSON.parse(localStorage.getItem('data')) === null ) {
        props.history.replace('/')
    }
    const token = JSON.parse(localStorage.getItem('data')).token;

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

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const openModal1 = () => setIsOpen1(true);
    const closeModal1 = () => setIsOpen1(false);

    const handleEditProduct = (index) => {
        openModal()
        const rowData = products[index]
        setIndex(index)
        setId(rowData.p_id)
        setproductImage(rowData.p_img)
        setproductName(rowData.p_name)
        setproductPrice(rowData.p_price)
        setDescription(rowData.description)
    }
    const updateProduct = (e) => {
        e.preventDefault()
        const isFilter = productfilterHelper(products, id, productName, productPrice, description, productImage)
        if (isFilter) {
            productNameInput.current.focus();
            Swal.fire({
                title: 'Product Name already exist!',
                text: 'duplicate!',
                icon: 'error'
            })
        } else {
            let info = new FormData();
            info.append('name', productName);
            info.append('price', productPrice);
            info.append('description', description);
            info.append('productImage', productImage)
            editProduct({ id, info, token }, (error, data) => {
                if (error) console.log('fetching error', error)
                else {

                    Swal.fire({
                        title: 'Edit Product',
                        text: ' successfully change your product!',
                        icon: 'success'
                        // text: data.message,
                    })
                    setIsOpen(false)
                    setProduct(data.payload)
                }
            })
        }

    }
    const handleNewProduct = () => {
        openModal1()
        setId('')
        setproductImage(null)
        setproductName('')
        setproductPrice('')
        setDescription('')
    }
    const AddNewProduct = (e) => {
        e.preventDefault()
        const isFilter = productfilterHelper(products, id, productName, productPrice, description, productImage)
        if (isFilter) {
            productNameInput.current.focus();
            Swal.fire({
                title: ' Product Name already exist!',
                text: 'duplicate!',
                icon: 'error'
            })
            setIsOpen(false)
        } else {
            let info = new FormData();
            info.append('name', productName);
            info.append('price', productPrice);
            info.append('description', description);
            info.append('productImage', productImage)
            addNewProduct({ info, token }, (error, data) => {
                if (error) console.log('fetching error', error)
                else {
                    setProduct(data.payload.reverse())
                    if (data.success) {
                        Swal.fire({
                            title: 'Add New Product',
                            text: ' successfully Added!',
                            // text: data.message,
                            icon: 'success',
                        })
                        setIsOpen1(false)
                        setId('')
                        setproductImage(null)
                        setproductName('')
                        setproductPrice('')
                        setDescription('')
                    }
                }
            })
        }
    }
    const deleteProduct = (index) => {
        const rowData = products[index]
        const id = rowData.p_id
        deleteAllProduct(id, token, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                data.success &&
                    Swal.fire({
                        title: 'Delete Product',
                        text: ' delete successfully!',
                        // text: data.message,
                        icon: 'success',
                    })
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
                label: 'Price',
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
        <div className="container-fluid" style={{ fontSize: 16 }}>
            <div className="p-4 text-center text-dark font-weight-bold" style={{ fontSize: '2rem' }}>
                Product Page
            </div>
            <div className="d-flex justify-content-end">
                <button type="button"
                    data-toggle="modal" data-target="#NewModal"
                    className="btn btn-outline-success "
                    style={{ width: 100, height: 30, fontSize: '1.5rem', }}
                    onClick={handleNewProduct}
                >
                    <i className="fas fa-plus" /> <span className="px-2">Add New </span>
                </button>
            </div>

            <KmDataTable data={TableData} />

            {/* ===================================================================== */}
            <KmModal isOpen={isOpen}>
                <div className="d-flex justify-content-between py-2">
                    <h4 >{"EDIT PRODUCT"}</h4>
                    <button className='btn' onClick={closeModal}><i className="fa fa-times" /></button>
                </div>
                <div className="py-2">
                    <input className="form-control"
                        style={{ height: 40, fontSize: '1.5rem' }}
                        type="text" placeholder="Name"
                        onChange={(e) => setproductName(e.currentTarget.value)}
                        value={productName}
                        ref={productNameInput}
                        autoFocus={true}
                    />
                </div>
                <div className="py-2" >
                    <input className="form-control"
                        style={{ height: 40, fontSize: '1.5rem' }}
                        type="number"
                        placeholder="Price"
                        onChange={(e) => setproductPrice(e.currentTarget.value)}
                        value={productPrice}
                    />
                </div>
                <div className="py-2" >
                    <textarea
                        className='form-control mb-4'
                        rows="3"
                        style={{ height: 40, fontSize: '1.5rem', minHeight: '80px', maxHeight: '80px' }}
                        placeholder={'Description'}
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div className="py-1">
                    {
                        productImage === null || productImage === undefined
                            ? <img src={`${IMG_SERVER}/${index === -1 ? productImage : products[index].p_img}`} className="img-thumbnail w-100" />
                            : typeof productImage === 'string'
                                ? <img src={`${IMG_SERVER}/${productImage}`} className="img-thumbnail w-100" />
                                : <img src={URL.createObjectURL(productImage)} className="img-thumbnail w-100" />
                    }
                    <label htmlFor="upload-photo" style={fileStyle}>Upload Image</label>
                    <input type="file" name="photo"
                        id="upload-photo"
                        style={photoStyle}
                        onChange={e => setproductImage(e.target.files[0])}
                        accept="image/*"

                    />

                </div>
                <div className="py-2 d-flex justify-content-end">
                    <button className="btn btn-primary py-2 px-4 mr-2" style={{ fontSize: 14 }} onClick={e => updateProduct(e)}>
                        <span><i className="fa fa-edit"></i></span>update
                        </button>
                    <button className="btn btn-warning py-2 px-4" style={{ fontSize: 14 }} onClick={closeModal}>Cancel</button>
                </div>

            </KmModal>
            {/* =========================== insert modal  ================================================================================================= */}
            <KmModal isOpen={isOpen1}>
                <form onSubmit={e => AddNewProduct(e)}>
                    <div className="d-flex justify-content-between py-2">
                        <h4 >{"ADD NEW PRODUCT"}</h4>
                        <button className='btn' onClick={closeModal1}><i className="fa fa-times" /></button>
                    </div>
                    <div className="py-2">
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="text" placeholder="Name"
                            onChange={(e) => setproductName(e.currentTarget.value)}
                            value={productName}
                            ref={productNameInput}
                            autoFocus={true}
                            required
                        />
                    </div>
                    <div className="py-2" >
                        <input className="form-control"
                            style={{ height: 40, fontSize: '1.5rem' }}
                            type="number" placeholder="Price"
                            onChange={(e) => setproductPrice(e.currentTarget.value)}
                            value={productPrice}
                            required
                        />
                    </div>
                    <div className="py-2" >
                        <textarea
                            className='form-control mb-4'
                            rows="3"
                            style={{ height: 40, fontSize: '1.5rem', minHeight: '80px', maxHeight: '80px' }}
                            placeholder={'Description'}
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                    </div>
                    <div className="py-1">
                        {/* <img src={`${IMG_SERVER}/${productImage}`} className="img-thumbnail w-100"  /> */}
                        <label htmlFor="upload-photo" style={fileStyle}>Upload Image</label>
                        <input type="file" name="photo"
                            id="upload-photo"
                            style={photoStyle}
                            onChange={e => setproductImage(e.target.files[0])}
                            accept="image/*"
                        />
                        {
                            productImage === null || productImage === undefined
                                ? <img src={'images/emptyImage.png'} className="img-thumbnail w-100" />
                                : typeof productImage === 'string'
                                    ? <img src={`${IMG_SERVER}/${productImage}`} className="img-thumbnail w-100" />
                                    : <img src={URL.createObjectURL(productImage)} className="img-thumbnail w-100" />
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



        </div>
    )
}
export default withMedia(AdminProductTable);

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

