import {useMutation} from "@tanstack/react-query";
import commonAxiosInstance from "../../axios/commonAxiosInstance";
import normalAxiosInstance from "../../axios/normalAxiosInstance";

export function QueryPostCreateProduct() {
    return useMutation({
        mutationKey: ["createProduct"],
        mutationFn: async (data: any) => {
            const response = await commonAxiosInstance.post('http://localhost:8080/api/v1/product', data)
            return response.data;
        }
    });
}

export function QueryPostUpdateProduct() {
    return useMutation({
        mutationKey: ["updateProduct"],
        mutationFn: async (data: any) => {
            const response = await commonAxiosInstance.put(`http://localhost:8080/api/v1/product/${data.productId}`, data)
            return response.data;
        }
    });
}

export function QueryPostUploadImage() {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await normalAxiosInstance.post(
                import.meta.env.VITE_IMAGE_CLOUD
                , data
                , {headers: {'Content-Type': 'multipart/form-data'}});
            return response.data;
        },
    });
}