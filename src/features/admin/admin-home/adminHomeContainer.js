import React from 'react'

import { admin } from '../../../config/route.config'
import AdminNavbar from './components/adminNavbar'
import AdminCategoryTable from '../admin-table/admin-category-table'
import AdminProfileTable from '../admin-table/admin-profile-table'

const adminHomeContainer = props => {

    return (
        <div>
            {/* <AdminNavbar/> */}
            <AdminProfileTable />
        </div>
    )
}
export default adminHomeContainer