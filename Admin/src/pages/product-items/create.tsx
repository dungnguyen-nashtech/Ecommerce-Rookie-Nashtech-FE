import {Button, Input, TextField} from "@mui/material";
import {useForm} from "@refinedev/react-hook-form";
import React, {useState} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import normalAxiosInstance from "../../axios/normalAxiosInstance";
import {SubmitHandler} from "react-hook-form";
import commonAxiosInstance from "../../axios/commonAxiosInstance";
import {useLocation} from "react-router-dom";

export const ProductItemCreate = () => {
    const [selectedImgUrl, setSelectedImgUrl] = useState(import.meta.env.VITE_IMAGE_SHOW_WHEN_NOT_FOUND);
    const location = useLocation();
    const fromProduct = new URLSearchParams(location.search).get("fromProduct");

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});

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
        dataSubmit.productId = fromProduct;
        const submittedValue = await commonAxiosInstance.post(`/productItem`, dataSubmit)
        if (submittedValue.status === 200) {
            if (fromProduct) {
                window.location.href = `/product/show/${fromProduct}`;
                return;
            }
            window.location.href = "/productItem";
        } else {
            alert("Failed to submit")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column"}}>

                <TextField
                    {...register("price")}
                    error={!!(errors as any)?.price}
                    helperText={(errors as any)?.price?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Price"}
                    name="price"
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
                    src={selectedImgUrl}
                    alt={"Uploaded file"}
                    style={{maxWidth: '20%', height: 'auto'}}/>
                <TextField
                    {...register("availableStock")}
                    error={!!(errors as any)?.availableStock}
                    helperText={(errors as any)?.availableStock?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Available Stock"}
                    name="availableStock"
                />
                <TextField
                    {...register("variationCombination")}
                    error={!!(errors as any)?.variationCombination}
                    helperText={(errors as any)?.variationCombination?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Variation"}
                    name="variationCombination"
                />
                <br/>
                <Button type={"submit"}>Submit</Button>
            </form>
        </>
    );
}
