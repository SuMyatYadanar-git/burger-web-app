import React from 'react'

const AdminNavbar = props => {

    return (
        <div className="container-fluid p-0">


            <div className="container-fluid p-0">
                <div className="d-flex flex-row justify-content-between p-4 bg-primary">

                    <div>hello</div>
                    <div className="d-flex " style={{ fontSize: '2rem', cursor: 'pointer' }}>
                        <div className="px-3">category</div>
                        <div className="px-3">products</div>
                        <div className="px-3">profile</div>
                        <div className="px-3">password</div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default AdminNavbar;