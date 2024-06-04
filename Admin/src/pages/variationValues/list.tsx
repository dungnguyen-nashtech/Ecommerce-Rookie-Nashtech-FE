import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DateField, DeleteButton, List, useDataGrid} from "@refinedev/mui";
import React from "react";
import {commonFilterOperators} from "../../commonFilters";

export const VariationValueList = () => {
    const {
        dataGridProps: allVariationValue,
    } = useDataGrid({});


    const variationValueColumns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                minWidth: 100,
                maxWidth: 200,
                filterOperators: commonFilterOperators,
            },
            {
                field: "name",
                flex: 1,
                headerName: "Name",
                minWidth: 200,
                filterOperators: commonFilterOperators,
                renderCell: ({row}) => {
                    return <>{row.name || ""}</>;
                },
            },
            {
                field: "variationName",
                flex: 1,
                headerName: "Variation Name",
                minWidth: 200,
                filterOperators: commonFilterOperators,
                renderCell: ({row}) => {
                    return <>{row.variationName || ""}</>;
                },
            },
            {
                field: "createdOn",
                flex: 1,
                headerName: "Created On",
                minWidth: 100,
                maxWidth: 200,
                filterOperators: commonFilterOperators,
                renderCell: ({value}) => <DateField value={value}/>,
            },
            {
                field: "lastUpdatedOn",
                flex: 1,
                headerName: "Last Updated",
                minWidth: 100,
                maxWidth: 200,
                filterOperators: commonFilterOperators,
                renderCell: ({value}) => {
                    return <DateField value={value}/>;
                },
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
            <DataGrid {...allVariationValue} columns={variationValueColumns} autoHeight/>
        </List>
    );
};
