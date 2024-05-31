import {useMutation} from "@tanstack/react-query";
import commonAxiosInstance from "../../axios/commonAxiosInstance";

export function QueryPostCreateProductItem() {
    return useMutation({
        mutationKey: ["createProduct"],
        mutationFn: async (data: any) => {
            const response = await commonAxiosInstance.post('http://localhost:8080/api/v1/productItem', data)
            return response.data;
        }
    });
}