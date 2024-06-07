import {Button, Input, TextField} from "@mui/material";
import {useForm} from "@refinedev/react-hook-form";
import React, {useState} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {SubmitHandler} from "react-hook-form";
import {useLocation} from "react-router-dom";
import {QueryPostUploadImage} from "../products/queries";
import {QueryPostCreateProductItem} from "./queries";

export const ProductItemCreate = () => {
    const [selectedImgBase64, setSelectedImgBase64] = useState(import.meta.env.VITE_IMAGE_SHOW_WHEN_NOT_FOUND);
    const [selectedImgFile, setSelectedImgFile] = useState<FormData | null>(null);
    const location = useLocation();
    const fromProduct = new URLSearchParams(location.search).get("fromProduct");

    const queryPostUploadImage = QueryPostUploadImage()
    const queryPostCreateProductItem = QueryPostCreateProductItem()

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});

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
        dataSubmit.productId = fromProduct;
        if (selectedImgFile != null) {
            queryPostUploadImage.mutate(selectedImgFile, {
                onSettled: (data) => {
                    dataSubmit.imageUrl = data.data?.url
                    queryPostCreateProductItem.mutate(dataSubmit, {
                        onSettled: () => {
                            window.location.href = "/productItem";
                        },
                        onError: () => {
                            alert("Failed to submit")
                        },
                    })
                },
            })
        } else {
            queryPostCreateProductItem.mutate(dataSubmit, {
                onSettled: () => {
                    window.location.href = "/productItem";
                },
                onError: () => {
                    alert("Failed to submit")
                },
            })
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
                <TextField
                    disabled={true}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"SIZE"}
                    value={"XS, S, M, L, XL"}
                /> <TextField
                disabled={true}
                margin="normal"
                fullWidth
                InputLabelProps={{shrink: true}}
                type="text"
                label={"COLOR"}
                value={"Trắng, Đen, Hồng Nhạt, Cam Nhạt, Da Đậm, Nâu, Xanh Lá, Tím Nhạt, Xám, Đỏ"}
            />
                <br/>
                <Button type={"submit"}>Submit</Button>
            </form>
        </>
    );
}
