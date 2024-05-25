import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DateField, DeleteButton, EditButton, List, useDataGrid} from "@refinedev/mui";
import React from "react";
import {commonFilterOperators} from "../../commonFilters";
import {useParams} from "react-router-dom";
import commonAxiosInstance from "../../axios/commonAxiosInstance";
import {Button} from "@mui/material";

export const ProductShow = () => {
    const {id} = useParams();
    const {dataGridProps, tableQueryResult: {refetch}} = useDataGrid(
        {
            dataProviderName: "getProductItemsByProductId",
            resource: "productItem",
            meta: {
                id: id,
            }
        }
    );

    const deleteProductItem = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await commonAxiosInstance.delete(`/productItem/${id}`)
            await refetch();
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
                field: "price",
                flex: 1,
                headerName: "Price",
                minWidth: 200,
                filterOperators: commonFilterOperators,
            },
            {
                field: "availableStock",
                flex: 1,
                headerName: "Available Stock",
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
                field: "variationCombination",
                flex: 1,
                headerName: "Variation",
                minWidth: 70,
                filterOperators: commonFilterOperators,
            },
            {
                field: "createdOn",
                flex: 1,
                headerName: "Created On",
                minWidth: 70,
                filterOperators: commonFilterOperators,
                renderCell: ({value}) => <DateField value={value}/>,
            },
            {
                field: "lastUpdatedOn",
                flex: 1,
                headerName: "Last Updated On",
                minWidth: 70,
                filterOperators: commonFilterOperators,
                renderCell: ({value}) => <DateField value={value}/>,
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: ({row}) => {
                    return (<>
                        <EditButton
                            onClick={() => window.location.href = `/productItem/${row.id}/edit?fromProduct=${id}`}
                            hideText/>
                        <DeleteButton onClick={() => deleteProductItem(row.id)} hideText recordItemId={row.id}/>
                    </>)

                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        []
    );

    return (

        <List>
            <Button onClick={() => window.location.href = `/productItem/create?fromProduct=${id}`}
                    variant={"outlined"} style={{marginBottom: "5px"}}> Create Product Item </Button>
            <DataGrid {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
};
