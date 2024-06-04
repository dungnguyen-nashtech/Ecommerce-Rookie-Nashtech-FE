import {
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {DateField, Edit} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import React, {useState} from "react";
import {useList} from "@refinedev/core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const ProductEdit = () => {
    const [featured, setFeatured] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const [selectedImgBase64, setSelectedImgBase64] = useState<any>(null);
    const [selectedImgFile, setSelectedImgFile] = useState<FormData | null>(null);


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

    const fileToBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = async (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        const base64 = await fileToBase64(file);
        if (file) {
            setSelectedImgBase64(base64);
            const imgSent = new FormData();
            imgSent.append("image", file);
            setSelectedImgFile(imgSent)
        }
    }

    if (formLoading || isLoading) {
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
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon/>}
                        style={{"margin": "10px 0 10px 0"}}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        onChange={handleFileChange}
                    >
                        <Input fullWidth={true} type="file"/>
                    </Button>
                    <img
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        src={!selectedImgBase64 ? queryResult?.data?.data?.imageUrl : selectedImgBase64}
                        alt={"Uploaded file"}
                        style={{maxWidth: '20%', height: 'auto'}}/>
                    <TextField
                        {...register("price")}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={"Price"}
                        name="price"
                    />
                    <FormControl style={{marginTop: "25px"}} fullWidth>
                        <InputLabel id="featured-select-label">Featured</InputLabel>
                        <Select
                            labelId="featured-select-label"
                            id="featured"
                            value={featured == '' ? data?.isFeatured : featured}
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
