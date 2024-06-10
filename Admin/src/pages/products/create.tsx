import {Button, FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import React, {useState} from "react";
import {useList} from "@refinedev/core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {QueryPostCreateProduct, QueryPostUploadImage} from "./queries";
import CenteredLoader from "../../components/CenteredLoader";

export const ProductCreate = () => {
    const [selectedImgBase64, setSelectedImgBase64] = useState(import.meta.env.VITE_IMAGE_SHOW_WHEN_NOT_FOUND);
    const [selectedImgFile, setSelectedImgFile] = useState<FormData | null>(null);

    const [featured, setFeatured] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const queryPostUploadImage = QueryPostUploadImage()
    const queryPostCreateProduct = QueryPostCreateProduct()


    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});

    const {data, isLoading} = useList({
        resource: "category",
        sorters: [{field: "id", order: "asc"}],
    });

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
        dataSubmit.imageUrl = "";
        dataSubmit.averageRating = 0;
        dataSubmit.isFeatured = featured;
        if (selectedImgFile != null) {
            queryPostUploadImage.mutate(selectedImgFile, {
                onSettled: (data) => {
                    dataSubmit.imageUrl = data.data?.url
                    queryPostCreateProduct.mutate(dataSubmit, {
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
            queryPostCreateProduct.mutate(dataSubmit, {
                onSettled: () => {
                    window.location.href = "/product";
                },
                onError: () => {
                    alert("Failed to submit")
                }
            })
        }
    }

    if (isLoading || queryPostUploadImage.isPending || queryPostCreateProduct.isPending) {
        return <CenteredLoader/>;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{display: "flex", flexDirection: "column"}}
        >
            <TextField
                {...register("name", {
                    required: "This field is required",
                })}
                error={!!(errors as any)?.title}
                helperText={(errors as any)?.title?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{shrink: true}}
                type="text"
                label={"Name"}
                name="name"
            />
            <TextField
                {...register("description", {
                    required: "This field is required"
                })}
                error={!!(errors as any)?.content}
                helperText={(errors as any)?.content?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{shrink: true}}
                multiline
                label={"Description"}
                name="description"
            />
            <TextField
                {...register("price", {
                    required: "This field is required",
                    pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter a valid number",
                    },
                })}
                error={!!(errors as any)?.price}
                helperText={(errors as any)?.price?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{shrink: true}}
                multiline
                type="text"
                label="Display Price"
                name="price"
                inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                }}
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
                src={selectedImgBase64}
                alt={"Uploaded file"}
                style={{maxWidth: '20%', height: 'auto'}}/>
            <TextField
                {...register("averageRating")}
                margin="normal"
                fullWidth
                InputLabelProps={{shrink: true}}
                label={"Average Rating"}
                name="averageRating"
                value={0}
                disabled={true}
            />
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
                    {data?.data.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl style={{marginTop: "25px"}} fullWidth>
                <InputLabel id="featured-select-label">Featured</InputLabel>
                <Select
                    labelId="featured-select-label"
                    id="featured"
                    value={featured}
                    label="Featured"
                    {...register("isFeatured")}
                    onChange={(event) => setFeatured(event.target.value as string)}
                >
                    <MenuItem value={"true"}>True</MenuItem>
                    <MenuItem value={"false"}>False</MenuItem>
                </Select>
            </FormControl>
            <br/>
            <br/>
            <Button type={"submit"}>Submit</Button>
        </form>
    );
};
