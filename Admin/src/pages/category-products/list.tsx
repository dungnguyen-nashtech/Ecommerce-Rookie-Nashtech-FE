import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DateField, DeleteButton, EditButton, List, ShowButton, useDataGrid} from "@refinedev/mui";
import React, {useState} from "react";
import {commonFilterOperators} from "../../commonFilters";
import {Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";

export const CategoryProductList = () => {
    const [categorySearchName, setCategorySearchName] = useState("");
    const {dataGridProps} = useDataGrid({
        dataProviderName: "getProducsByCategoryName",
        sorters: {mode: "off"},
        filters: {mode: "off"},
        meta: {
            categoryName: categorySearchName,
        }
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
                field: "categories",
                flex: 1,
                headerName: "Categories",
                minWidth: 100,
                filterOperators: commonFilterOperators,
                renderCell: ({row}) => {
                    const categoriesString = [];
                    for (let j = 0; j < row?.categories?.length; j++) {
                        categoriesString.push(row?.categories[j]?.name);
                    }
                    return <>{categoriesString.sort().join(", ").slice(0, 20) + "..." || ""}</>
                },
            },
            {
                field: "averageRating",
                flex: 1,
                headerName: "Average Rating",
                minWidth: 70,
                maxWidth: 120,
                align: "center",
                filterOperators: commonFilterOperators,
            },
            {
                field: "isFeatured",
                flex: 1,
                headerName: "Featured",
                minWidth: 50,
                maxWidth: 70,
                align: "center",
                filterOperators: commonFilterOperators,
                renderCell: ({row}) => (<>{row?.isFeatured ? "✔️" : "❌"}</>),
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
                        <ShowButton hideText recordItemId={row.id}/>
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

    const {
        register,
        handleSubmit
    } = useForm({});

    const onSubmit: SubmitHandler<any> = async (dataSubmit) => {
        if (dataSubmit.categoryName !== "" || dataSubmit.categoryName !== null) {
            setCategorySearchName(dataSubmit.categoryName);
        }
    }

    return (
        <List>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{display: "flex", flexDirection: "column"}}
            >
                <TextField
                    {...register("categoryName", {
                        required: "This field is required",
                    })}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Name"}
                    name="categoryName"
                />
                <Button type={"submit"}>Find</Button>
            </form>
            <DataGrid {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
};
