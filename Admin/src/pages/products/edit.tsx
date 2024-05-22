import {Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {DateField, Edit} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import React, {useState} from "react";
import {useList} from "@refinedev/core";

export const ProductEdit = () => {
    const [featured, setFeatured] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const {
        saveButtonProps,
        refineCore: {queryResult, formLoading}, // queryResult?.data?.data
        register,
    } = useForm({});

    const data = queryResult?.data?.data;

    const {data: allCategories, isLoading} = useList({
        resource: "category",
        sorters: [{field: "id", order: "asc"}],
    });

    const listCurrentCategories = () => {
        let categories = "";
        data?.categories.map((category: { name: string; }) => (
            categories += ", " + category.name
        ))
        return categories.slice(1);
    }

    if (formLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
                <Box
                    component="form"
                    sx={{display: "flex", flexDirection: "column"}}
                    autoComplete="off"
                >
                    <TextField
                        {...register("name")}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={"Name"}
                        name="name"
                    />
                    <TextField
                        {...register("description")}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        multiline
                        label={"Description"}
                        name="description"
                        rows={4}
                    />
                    <FormControl style={{marginTop: "25px"}} fullWidth>
                        <InputLabel id="featured-select-label">Featured</InputLabel>
                        <Select
                            labelId="featured-select-label"
                            id="featured"
                            value={data?.isFeatured ? "true" : "false"}
                            label="Featured"
                            {...register("isFeatured")}
                            onChange={(event) => setFeatured(event.target.value as string)}
                        >
                            <MenuItem value={"true"}>True</MenuItem>
                            <MenuItem value={"false"}>False</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{marginTop: "12px"}} fullWidth>
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category"
                            multiple
                            value={selectedCategory}
                            label="Category"
                            {...register("categoryIds")}
                            onChange={(event) => setSelectedCategory(event.target.value as string[])}
                        >
                            {allCategories?.data.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={"Current Categories"}
                            disabled={true}
                            value={listCurrentCategories()}
                        />
                    </FormControl>
                </Box>
            </Edit>
            <br/>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {"ID"} : {data?.id}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {"Created On"}
                </Typography>
                <DateField
                    format={"DD:MM:YYYY HH:mm hh:mm:ss A"}
                    value={data?.createdOn}/>
                <Typography variant="body1" fontWeight="bold">
                    {"Last Updated On"}
                </Typography>
                <DateField
                    format={"DD:MM:YYYY HH:mm hh:mm:ss A"}
                    value={data?.lastUpdatedOn}/>
            </Stack>
        </>
    );
};
