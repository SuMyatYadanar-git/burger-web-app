import React, { useState, useEffect } from 'react'
import ReactTable from "react-table";

import "react-table/react-table.css"
import { getAllCategory, deleteAllCategory } from '../../../network/categoryFetcher'
import Mybtn from '../../../common/myButton'


const CategoryTalbe = props => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        getAllCategory((error, data) => {
            if (error) console.error(error)
            else setCategory(data)
        })
    }, [])

    const handleEdit = () => {
        console.log("clicking")
    }
    const handleDeleteCategory = (row) => {
        deleteAllCategory(row.c_id, (error, data) => {
            if (error) console.log('fetching error', error)
            else {
                data.status === true && alert(data.message)
                setCategory(data.payload)
            }
        })
    }

    if (category.length === 0) return null;

    const temp = Object.keys(category[0])
    const renderEditable=(cellInfo) =>{
        return(
            <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={
           e=>console.log(e.target.value)
        }
        // onBlur={e => {
        //   const data = [...this.state.data];
        //   data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        //   data[cellInfo.index].full = data[cellInfo.index].age * 2;
        //   this.setState({ data });
        // }}
        // dangerouslySetInnerHTML={{
        //   __html: this.state.data[cellInfo.index][cellInfo.column.id]
        // }}
      />
        )
    } 

    const columns = [{
        Header: 'Category Image',
        accessor: temp[1],
        Cell:  row => (
            <img className="img-thumbnail" src={row.original.c_img} />
        )

    },
    {
        Header: 'Category Name',
        accessor: temp[2],
        Cell: renderEditable
    },
    // {
    //     Header: '',
    //     columns: [
    //         {
    //             Header: '',
    //             Cell: row => (
    //                 <Mybtn text="Edit" className="btn-warning"  onClick={() => console.log(row.original)} />
    //             )

    //         },
    //         {
    //             Header: '',
    //             Cell: row => (
    //                 <Mybtn text="Delete" className="btn-warning"  onClick={() => handleDeleteCategory(row.original)} />
    //             )
    //         }
    //     ]
    // }
        {
            Header: '',
            // onClick={() => handleEdit(row.original)}
            Cell: row => (
                <Mybtn text="Edit" className="btn-warning " width={200}  onClick={() => console.log(row.original)} />
            )
        },
        {
            Header: '',
            Cell: row => (
                <Mybtn text="Delete" className="btn-warning " width={200} onClick={() => handleDeleteCategory(row.original)} />
            )
        }
    ]

    return (
        <div>
            <ReactTable
                contentEditable
                className="-striped -highlight "
                data={category}
                columns={columns}
                defaultPageSize={category.length}
            // pageSizeOptions = {[4,2]}  
            // SubComponent={row => {
            //     return (
            //       <div>
            //         You can put any component you want here, even another React Table! You
            //         even have access to the row-level data if you need! Spark-charts,
            //         drill-throughs, infographics... the possibilities are endless!
            //       </div>
            //     )
            //   }}
            />
        </div>
    )
}
// const columns = [{
//     Header: 'Name',
//     accessor: 'name'
// }, {
//     Header: 'Age',
//     accessor: 'age'
// }]

// const data = [{
//     name: 'Ayaan',
//     age: 26
// }, {
//     name: 'Ahana',
//     age: 22
// }, {
//     name: 'Peter',
//     age: 40
// }, {
//     name: 'Virat',
//     age: 30
// }, {
//     name: 'Rohit',
//     age: 32
// }, {
//     name: 'Dhoni',
//     age: 37
// }]

export default CategoryTalbe;