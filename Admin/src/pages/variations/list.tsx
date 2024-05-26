import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DateField, DeleteButton, EditButton, List, useDataGrid} from "@refinedev/mui";
import React from "react";
import {commonFilterOperators} from "../../commonFilters";
import {useDataProvider, useDelete} from "@refinedev/core"; // Import necessary hooks from refinedev
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export const VariationList = () => {
    const dataProvider = useDataProvider(); // Access the data provider

    const {
        dataGridProps: allVariation,
        tableQueryResult: {refetch: refetchAllVariation},
    } = useDataGrid({
        dataProviderName: "getAllVariations"
    });

    const {mutate: deleteVariation} = useDelete(); // Use delete hook from refinedev

    const [open, setOpen] = React.useState(false);
    const [selectedVariationId, setSelectedVariationId] = React.useState(null);

    const handleClickOpen = (variationId: any) => {
        setSelectedVariationId(variationId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVariationId(null);
    };

    const handleConfirmDelete = () => {
        if (selectedVariationId) {
            deleteVariation({
                resource: "variationValue/variation",
                id: selectedVariationId,
                successNotification: false,
                mutationMode: "optimistic",
            }, {
                onSuccess: async () => {
                    await refetchAllVariation();
                    handleClose();
                }
            });
        }
    };

    const variationColumns = React.useMemo<GridColDef[]>(
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
                        <EditButton hideText recordItemId={row.id}/>
                        <DeleteButton hideText onClick={() => handleClickOpen(row.id)}/>
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
            <DataGrid {...allVariation} columns={variationColumns} autoHeight/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this variation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </List>
    );
};
