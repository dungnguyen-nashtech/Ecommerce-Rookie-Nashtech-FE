import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DateField, DeleteButton, List, useDataGrid} from "@refinedev/mui";
import React from "react";
import {commonFilterOperators} from "../../commonFilters";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import {QueryPostApproveOrder} from "./queries";

export const OrderList = () => {
    const {dataGridProps, tableQueryResult: {refetch,}} = useDataGrid();

    const queryPostApproveOrder = QueryPostApproveOrder();

    const approveOrder = async (row: { id: any; }) => {
        const confirmed = window.confirm("Are you sure you want to approve this order and send email to customer?");
        if (confirmed) {
            queryPostApproveOrder.mutate({orderId: row.id}, {
                onSuccess: async () => {
                    await refetch();
                }
            });
        }

    }

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
                maxWidth: 80,
                filterOperators: commonFilterOperators,
                renderCell: ({row}) => (<>{row?.approved ? "✔️" : "❌"}</>),
            },
            {
                field: "issuedAt",
                flex: 1,
                headerName: "Issued At",
                minWidth: 70,
                maxWidth: 100,
                filterOperators: commonFilterOperators,
                renderCell: ({value}) => <DateField value={value}/>,
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: ({row}) => (
                    <>
                        {!row?.approved && <PriceCheckIcon
                            onClick={() => approveOrder(row)}
                            style={{cursor: "pointer"}}/>}

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
