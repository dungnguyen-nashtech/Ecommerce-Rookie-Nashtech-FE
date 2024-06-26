import type {DataProvider} from "@refinedev/core";
import {GetOnePayLoad} from "../payloads/ProductItemRequests";
import commonAxiosInstance from "../axios/commonAxiosInstance";

const API_URL = "http://localhost:8080/api/v1";


export const getProductsByCategoryName: DataProvider = {
    getApiUrl: () => API_URL,

    getOne: async ({resource, id}) => {
        const requestPayload = GetOnePayLoad(id.toString());
        const response = await commonAxiosInstance.post(
            `${API_URL}/${resource}/search`, requestPayload
        );
        if (response.status < 200 || response.status > 299) throw response;
        window.location.reload();
        return {data: response?.data[0]};
    },
    update: async ({resource, id, variables}) => {
        const response = await commonAxiosInstance.put(
            `${API_URL}/${resource}/${id}`, variables
        );

        if (response.status < 200 || response.status > 299) throw response;
        console.log(response)
        return {
            data: response?.data,
        };
    },
    getList: async ({meta}) => {
        if (meta?.categoryName === "") return {data: [], total: 0};
        const response = await commonAxiosInstance.post(
            `${API_URL}/product/category`, {
                name: meta?.categoryName
            }
        );

        if (response.status < 200 || response.status > 299) throw response;
        console.log(response)
        return {
            data: response?.data,
            total: response?.data?.length,
        };
    },
    create: async ({resource, variables}) => {
        const response = await commonAxiosInstance.post(
            `${API_URL}/${resource}`, variables
        );

        if (response.status < 200 || response.status > 299) throw response;

        return {
            data: response?.data,
        };
    },
    deleteOne: async ({resource, id}) => {
        const response = await commonAxiosInstance.delete(
            `${API_URL}/${resource}/${id}`
        );
        if (response.status < 200 || response.status > 299) throw response;

        return {
            data: response?.data,
        };
    },
};