import {Button, Input, Stack, TextField, Typography} from "@mui/material";
import {DateField} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import React, {useState} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import normalAxiosInstance from "../../axios/normalAxiosInstance";
import {SubmitHandler} from "react-hook-form";
import commonAxiosInstance from "../../axios/commonAxiosInstance";

export const ProductItemEdit = () => {
    const [selectedImgUrl, setSelectedImgUrl] = useState(null);

    const {
        refineCore: {queryResult, formLoading}, // queryResult?.data?.data
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});

    const data = queryResult?.data?.data;

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
        if (!selectedImgUrl) {
            dataSubmit.imageUrl = data?.imageUrl;
        } else {
            dataSubmit.imageUrl = selectedImgUrl;
        }
        const submittedValue = await commonAxiosInstance.put(`/productItem/${data?.id}`, dataSubmit)
        console.log(submittedValue)
        if (submittedValue.status === 200) {
            window.location.href = "/productItem";
        } else {
            alert("Failed to submit")
        }
    }


    if (formLoading) {
        return <div>Loading...</div>;
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
                    onChange={handleFileChange}
                >
                    <Input fullWidth={true} type="file"/>
                </Button>
                {selectedImgUrl ?
                    <img
                        src={selectedImgUrl}
                        alt={"Uploaded file"}
                        style={{maxWidth: '20%', height: 'auto'}}/> :
                    <img
                        src={data?.imageUrl ? data?.imageUrl : import.meta.env.VITE_IMAGE_SHOW_WHEN_NOT_FOUND}
                        alt={"Uploaded file"}
                        style={{maxWidth: '20%', height: 'auto'}}/>}
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
            <br/>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {"ID"} : {data?.id}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {"Product ID"} : {data?.productId}
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
}
