import React from 'react'
import DataTable, {/* memoize */} from 'react-data-table-component';
import { withMedia } from 'react-media-query-hoc'

const KmTable = props => {

    const {
        media, data, columns, keyField, defaultSortField, highlightOnHover, style,
        customTheme, pagination = true, paginationDefaultPage, paginationTotalRows, pointerOnHover,
        paginationPerPage, customPagination = true
    } = props

    return (
        <DataTable
            columns={columns}
            data={data}
            keyField={keyField}
            pointerOnHover={pointerOnHover}
            defaultSortField={defaultSortField}
            highlightOnHover={highlightOnHover}
            style={style}
            customTheme={customTheme}
            pagination={pagination}
            paginationDefaultPage={paginationDefaultPage}
            paginationTotalRows={paginationTotalRows}
            paginationPerPage={paginationPerPage}
            paginationComponent={customPagination ? props => <CustomPagination media={media} {...props} /> : null}
            paginationComponentOptions={customPagination ? { rowsPerPageText: 'Rows per page:', rangeSeparatorText: 'on' } : {}}
        />
    )
}

export default withMedia(KmTable);

const CustomPagination = props => {   
    const { media, onChangePage, currentPage, rowCount, rowsPerPage, } = props
    const last = Math.ceil(rowCount / rowsPerPage);
    const left = currentPage > 1 ? currentPage - 1 : 0;
    const right = currentPage < last ? currentPage + 1 : 0;

    const pages = new Array(last).fill(null).map((v, k) => k + 1)
    const pageList = pages < 6 ? [...pages] : pages.reduce((r, c, i, a) => {
        if (c === 1 || c === left || c === currentPage || c === right || c === last) return [...r, c]
        else if (r[r.length - 1] !== 0) return [...r, 0]
        else return [...r]
    }, [])

    const pageView = pageList.map((v, k) => {
        const { bgColor, txtColor } = currentPage === v ? { bgColor: "#153784", txtColor: "#ffffff" } : { bgColor: "#ffffff", txtColor: "#454545" }
        const nextPage = v === 1 ? 1
            : v === last ? last
                : v === left ? left
                    : v === right ? right : currentPage
        return (
            <div key={k} onClick={() => onChangePage(nextPage)} className="px-1" style={{ cursor: "pointer" }} >
                {v === 0 && <span style={{ color: "#878787" }}><i className="fas fa-ellipsis-h"></i></span>}
                {v > 0 && <span className="p-2" style={{ fontSize: 11, color: txtColor, backgroundColor: bgColor, borderRadius: 4 }} >{v}</span>}
            </div>
        )
    })

    return (
        <div className={`w-100 d-flex align-items-center ${media.mobile ? 'justify-content-start' : 
        'justify-content-center'}`} style={{}}>
            {pageView}
        </div>
    )
}