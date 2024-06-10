import {Button, FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useForm} from "@refinedev/react-hook-form";
import React, {useState} from "react";
import {useList} from "@refinedev/core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {SubmitHandler} from "react-hook-form";
import {QueryPostUpdateProduct, QueryPostUploadImage} from "./queries";

export const ProductEdit = () => {
    const [featured, setFeatured] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const [selectedImgBase64, setSelectedImgBase64] = useState<any>(null);
    const [selectedImgFile, setSelectedImgFile] = useState<FormData | null>(null);

    const queryPostUpdateProduct = QueryPostUpdateProduct()
    const queryPostUploadImage = QueryPostUploadImage()


    const {
        refineCore: {queryResult, formLoading}, // queryResult?.data?.data
        register, handleSubmit
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

    const onSubmit: SubmitHandler<any> = async (dataSubmit) => {
        dataSubmit.productId = data?.id;
        dataSubmit.averageRating = 0;
        dataSubmit.isFeatured = featured;
        dataSubmit.imageUrl = data?.imageUrl;

        if (dataSubmit.categoryIds === "") {
            dataSubmit.categoryIds = []
        }

        if (selectedImgFile != null) {
            queryPostUploadImage.mutate(selectedImgFile, {
                onSettled: (data) => {
                    dataSubmit.imageUrl = data.data?.url
                    queryPostUpdateProduct.mutate(dataSubmit, {
                        onSettled: () => {
                            window.location.href = "/product";
                        },
                        onError: () => {
                            alert("Failed to submit")
                        },
                    })
                },
            })
        } else {
            queryPostUpdateProduct.mutate(dataSubmit, {
                onSettled: () => {
                    window.location.href = "/product";
                },
                onError: () => {
                    alert("Failed to submit")
                }
            })
        }
    }

    if (formLoading || isLoading || queryPostUploadImage.isPending || queryPostUpdateProduct.isPending) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                  style={{display: "flex", flexDirection: "column"}}>
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
                <br/>
                <img
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    src={!selectedImgBase64 ? data?.imageUrl : selectedImgBase64}
                    alt={"Uploaded file"}
                    style={{maxWidth: '20%', height: 'auto'}}/>
                <TextField
                    {...register("price", {
                        required: "This field is required",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Please enter a valid number",
                        },
                    })}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                    }}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Display Price"}
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
                <br/>
                <br/>
                <Button type={"submit"}>Submit</Button>
            </form>
            <br/>
        </>
    );
};
