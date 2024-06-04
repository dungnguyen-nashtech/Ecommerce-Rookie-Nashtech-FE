import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DateField, DeleteButton, List, useDataGrid} from "@refinedev/mui";
import React from "react";
import {commonFilterOperators} from "../../commonFilters";

export const OrderDetailList = () => {
    const {dataGridProps} = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                minWidth: 50,
                filterOperators: commonFilterOperators,
            },
            {
                field: "productName",
                headerName: "Product Name",
                minWidth: 250,
                filterOperators: commonFilterOperators,
            },
            {
                field: "price",
                flex: 1,
                headerName: "Price",
                minWidth: 200,
                filterOperators: commonFilterOperators,
            },
            {
                field: "orderDetailProductId",
                flex: 1,
                headerName: "ProductId",
                minWidth: 80,
                filterOperators: commonFilterOperators,
            },
            {
                field: "orderDetailOrderId",
                flex: 1,
                headerName: "OrderId",
                minWidth: 80,
                filterOperators: commonFilterOperators,
            },
            {
                field: "userId",
                flex: 1,
                headerName: "UserId",
                minWidth: 80,
                filterOperators: commonFilterOperators,
            },
            {
                field: "quantity",
                flex: 1,
                headerName: "Quantity",
                minWidth: 80,
                filterOperators: commonFilterOperators,
            },
            {
                field: "description",
                flex: 1,
                headerName: "Description",
                minWidth: 250,
                filterOperators: commonFilterOperators,
            },
            {
                field: "imageUrl",
                flex: 1,
                headerName: "Image",
                minWidth: 70,
                filterOperators: commonFilterOperators,
                renderCell: ({value}) => <img src={value} style={{width: 40, height: 50}} alt=""/>,
            },
            {
                field: "createdOn",
                flex: 1,
                headerName: "Created On",
                minWidth: 130,
                filterOperators: commonFilterOperators,
                renderCell: ({value}) => <DateField value={value}/>,
            },
            {
                field: "lastUpdatedOn",
                flex: 1,
                headerName: "Last Updated On",
                minWidth: 130,
                filterOperators: commonFilterOperators,
                renderCell: ({value}) => <DateField value={value}/>,
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: ({row}) => (
                    <>
                        <DeleteButton hideText recordItemId={row.id}/>
                    </>
                ),
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        []
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
};
