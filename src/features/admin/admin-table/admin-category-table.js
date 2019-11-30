import React, { useState, useEffect } from 'react'
import { withMedia } from 'react-media-query-hoc'
import { memoize } from 'react-data-table-component'

import tableTheme from "../../../common/TableThems"
import KmTable from '../../../common/KmTable'
import KmModal from '../../../common/KmModal'

import { getAllCategory, deleteAllCategory } from '../../../network/categoryFetcher'

import { IMG_SERVER } from '../../../network/api'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const initialSelectedRow = { id: null, image: null, name: null }

const AdminCategoryTable = props => {
    const [category, setCategory] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(initialSelectedRow)
    const { media } = props
    // const token = JSON.parse(localStorage.getItem('data')).token;

    const openModal = () => setModalOpen(true)
    const closeModal = () => {
        setModalOpen(false);
        setSelectedRow(initialSelectedRow);
    }

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

    const data = category.map(v => ({
        id: v.c_id,
        image: v.c_img,
        name: v.c_name
    }))

    const handleDeleteCategory = (row) => {
        console.log(row)
        openModal()
        // for console about modal
        // deleteAllCategory(row.id, (error, data) => {
        //     if (error) console.log('fetching error', error)
        //     else {
        //         data.status === true && alert(data.message)
        //         setCategory(data.payload)
        //     }
        // })
    }
    const handleEditCategory = (row) => {
        openModal()
        setSelectedRow(row)
    }

    return (
        <div className="container-fluid">

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

            <KmModal
                isOpen={modalOpen}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h3>{selectedRow.name}</h3>
                <button onClick={closeModal}>close</button>
            </KmModal>

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
            minWidth: '200px',
            cell: row =>
                <img src={IMG_SERVER + '/uploads/' + row.image} className=" img-thumbnail " width={120} />
            // <div style={{ color: '#153784', fontWeight: 700, textAlign: 'center' }}>{row.image}</div>
        },
        {
            name: 'Category Name',
            selector: 'name',
            sortable: true,
            right: true,
            minWidth: '300px'
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
            minWidth: '100px',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => {
                return (
                    <div
                        onClick={() => handleDeleteCategory(row)}
                        style={{ textAlign: 'right', cursor: 'pointer', color: '#a3a3a2', borderRadius: 6 }}
                        className="p-3 bg-danger text-light"
                    >
                        DELETE
                         </div>
                )
            }
        },
    ]);