import {Button, FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import React, {useState} from "react";
import {useList} from "@refinedev/core";
import commonAxiosInstance from "../../axios/commonAxiosInstance";
import normalAxiosInstance from "../../axios/normalAxiosInstance";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const ProductCreate = () => {
    const [selectedImgUrl, setSelectedImgUrl] = useState('');
    const [featured, setFeatured] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});

    const {data, isLoading} = useList({
        resource: "category",
        sorters: [{field: "id", order: "asc"}],
    });

    const handleFileChange = async (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        if (file) {
            const imgSent = new FormData();
            imgSent.append("image", file);
            const imageResponse = await normalAxiosInstance.post(import.meta.env.VITE_IMAGE_CLOUD
                , imgSent, {headers: {'Content-Type': 'multipart/form-data',}});
            if (imageResponse?.data?.success) {
                setSelectedImgUrl(imageResponse?.data?.data?.url);
            }
        }
    }


    const onSubmit: SubmitHandler<any> = async (dataSubmit) => {
        dataSubmit.imageUrl = selectedImgUrl;
        dataSubmit.averageRating = 0;
        dataSubmit.isFeatured = featured;
        const submittedValue = await commonAxiosInstance.post('http://localhost:8080/api/v1/product', dataSubmit)
        if (submittedValue.status === 200) {
            window.location.href = "/product";
        } else {
            alert("Failed to submit")
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
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
                    required: "This field is required",
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
                src={selectedImgUrl != '' ? selectedImgUrl : import.meta.env.VITE_IMAGE_SHOW_WHEN_NOT_FOUND}
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
