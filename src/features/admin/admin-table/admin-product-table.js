import React, { useState, useEffect } from 'react'
import { withMedia } from 'react-media-query-hoc'
import { memoize } from 'react-data-table-component'

import tableTheme from "../../../common/TableThems"
import KmTable from '../../../common/KmTable'
import Mybtn from '../../../common/myButton'

import { IMG_SERVER } from '../../../network/api'
import { getAllProduct, deleteAllProduct } from '../../../network/productFetcher'

const AdminProductTable = props => {
    const { media } = props
    const [products, setProduct] = useState([])


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

    const data = products.map(v => ({
        id: v.p_id,
        image: v.p_img,
        name: v.p_name,
        price: v.p_price,
        description: v.description
    })
    )

    const handleDeleteProduct = (row) => {
        const id = row.id
        const token = JSON.parse(localStorage.getItem('data')).token
        let info={
            id:id,
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
    const handleEditProduct = (row) => {
        console.log(row)
    }


    return (
        <div className="container-fluid">
            <KmTable
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
            />

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