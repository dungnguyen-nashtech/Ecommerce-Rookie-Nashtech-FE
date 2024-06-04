import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DeleteButton, EditButton, List, useDataGrid} from "@refinedev/mui";
import React from "react";
import {commonFilterOperators} from "../../commonFilters";

export const OrderList = () => {
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
                field: "commodityCode",
                flex: 1,
                headerName: "Code",
                minWidth: 200,
                filterOperators: commonFilterOperators,
            },
            {
                field: "totalQuantity",
                flex: 1,
                headerName: "Total Quantity",
                minWidth: 70,
                filterOperators: commonFilterOperators,
            },
            {
                field: "totalPrice",
                flex: 1,
                headerName: "Total Price",
                minWidth: 100,
                filterOperators: commonFilterOperators,
            },
            {
                field: "orderUserId",
                flex: 1,
                headerName: "User Id",
                minWidth: 70,
                filterOperators: commonFilterOperators,
            },
            {
                field: "orderProductId",
                flex: 1,
                headerName: "Product Id",
                minWidth: 70,
                filterOperators: commonFilterOperators,
            },
            {
                field: "approved",
                flex: 1,
                headerName: "Approved",
                minWidth: 70,
                filterOperators: commonFilterOperators,
                renderCell: ({row}) => (<>{row?.approved ? "✔️" : "❌"}</>),
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: ({row}) => (
                    <>
                        <EditButton hideText onClick={() => window.location.href = `/productItem/${row.id}/edit`}/>
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
