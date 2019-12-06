import React from 'react';
import { MDBDataTable } from 'mdbreact';

const KmDataTable = ({ data }) => {
    return (
        <MDBDataTable
            striped
            bordered
            small
            responsive
            noBottomColumns
            data={data}
            // sorting={true}
            // order={['age', 'asc' ]}
        />
    );
}

export default KmDataTable;