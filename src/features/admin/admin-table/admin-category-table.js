import React, { useState, useEffect } from 'react'
import { withMedia } from 'react-media-query-hoc'
import { memoize } from 'react-data-table-component'

import tableTheme from "../../../common/TableThems"
import KmTable from '../../../common/KmTable'
// import Mybtn from '../../../common/myButton'

import { getAllCategory, deleteAllCategory } from '../../../network/categoryFetcher'

const AdminCategoryTable = props => {
    const [category, setCategory] = useState([])
    const { media } = props

    useEffect(() => {
        getAllCategory((error, data) => {
            if (error) console.error(error)
            else setCategory(data)
        })
    }, [])
    if (category.length === 0) return null;

    const data = category.map(v => ({
        id: v.c_id,
        image: v.c_img,
        name: v.c_name
    }))

    const handleDeleteCategory = (row) => {
        deleteAllCategory(row.id, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                data.status === true && alert(data.message)
                setCategory(data.payload)
            }
        })
    }
    const handleEditCategory = (row) => {
        console.log(row)
    }

    return (
        <div>
            <KmTable
                columns={columns(media, handleDeleteCategory, handleEditCategory)}
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
export default withMedia(AdminCategoryTable)

const columns = memoize((media, handleDeleteCategory, handleEditCategory) =>
    [
        {
            name: 'Image',
            selector: 'image',
            sortable: true,
            // minWidth: '200px',
            cell: row =>
                <img src={row.image} className=" img-thumbnail" width={100} height={200} />
            // <div style={{ color: '#153784', fontWeight: 700, textAlign: 'center' }}>{row.image}</div>
        },
        {
            name: 'Category Name',
            selector: 'name',
            sortable: true,
            right: true,
            // minWidth: '120px',
        },
        {
            name: '',
            selector: '',
            right: true,
            // minWidth: '200px',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => {
                return (
                    // <Mybtn
                    //     text="Edit"
                    //     className=" btn-outline-warning"
                    //     onClick={() => console.log(row)}
                    // />
                    <div
                        onClick={() => handleEditCategory(row)}
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
            // minWidth: '200px',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => {
                return (
                    // <Mybtn
                    //     text="Delete"
                    //     className=" btn-outline-warning"
                    //     onClick={() => console.log(row)}
                    // />
                    <div
                        onClick={() => handleDeleteCategory(row)}
                        style={{ textAlign: 'right', cursor: 'pointer', color: '#a3a3a2' }}
                        className="p-3 bg-danger text-light"
                    >
                        DELETE
                         </div>
                )
            }
        },
    ]);