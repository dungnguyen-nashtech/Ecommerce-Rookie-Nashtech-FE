import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DateField, DeleteButton, EditButton, List, useDataGrid} from "@refinedev/mui";
import React from "react";
import {commonFilterOperators} from "../../commonFilters";

export const UserList = () => {
    const {dataGridProps} = useDataGrid();

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
                field: "email",
                flex: 1,
                headerName: "Email",
                minWidth: 200,
                maxWidth: 250,
                filterOperators: commonFilterOperators,
            },
            {
                field: "firstName",
                flex: 1,
                headerName: "FirstName",
                maxWidth: 120,
                filterOperators: commonFilterOperators,
            },
            {
                field: "lastName",
                flex: 1,
                headerName: "LastName",
                maxWidth: 120,
                filterOperators: commonFilterOperators,
            },
            {
                field: "roles",
                flex: 1,
                headerName: "Roles",
                minWidth: 100,
                filterOperators: commonFilterOperators,
                renderCell: ({row}) => {
                    const rolesString = [];
                    for (let j = 0; j < row?.roles?.length; j++) {
                        rolesString.push(row?.roles[j]?.roleName);
                    }
                    return <>{rolesString.sort().join(", ").slice(0, 20) + "..." || ""}</>
                },
            },
            {
                field: "enabled",
                flex: 1,
                headerName: "Enabled",
                minWidth: 50,
                maxWidth: 70,
                align: "center",
                filterOperators: commonFilterOperators,
                renderCell: ({row}) => (<>{row?.enabled ? "✔️" : "❌"}</>),
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
