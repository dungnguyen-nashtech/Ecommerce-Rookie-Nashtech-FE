import commonAxiosInstance from "../axios/commonAxiosInstance";

const SEARCH = "search";
// const PAGINATED = "search/paginated";

export const getListRole = async () => {
    const response = await commonAxiosInstance.get(`/role/all`);
    return response.data;
};

export const getAllVariation = async () => {
    const response = await commonAxiosInstance.get(`/variationValue/variation`);
    return response.data;
}