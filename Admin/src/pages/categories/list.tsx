import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DateField, DeleteButton, EditButton, List, useDataGrid} from "@refinedev/mui";
import React from "react";
import {commonFilterOperators} from "../../commonFilters";

export const CategoryList = () => {
    const {dataGridProps} = useDataGrid({
        sorters: {mode: "off"},
        filters: {mode: "off"},
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                minWidth: 40,
                maxWidth: 50,
                filterOperators: commonFilterOperators,
            },
            {
                field: "name",
                flex: 1,
                headerName: "Name",
                minWidth: 200,
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
                field: "parentCategoryName",
                flex: 1,
                headerName: "Parent",
                minWidth: 50,
                maxWidth: 100,
                filterOperators: commonFilterOperators,
                // disableColumnMenu: true,
                // filterable: false,
                // sortable: false,
                // hideSortIcons: true,
                renderCell: ({row}) => {
                    return <>{row?.parentCategoryName}</>
                },
            },
            {
                field: "createdOn",
                flex: 1,
                headerName: "Created On",
                minWidth: 70,
                maxWidth: 100,
                filterOperators: commonFilterOperators,
                renderCell: ({value}) => <DateField value={value}/>,
            },
            {
                field: "lastUpdatedOn",
                flex: 1,
                headerName: "Last Updated",
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
                        <EditButton hideText recordItemId={row.id}/>
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
