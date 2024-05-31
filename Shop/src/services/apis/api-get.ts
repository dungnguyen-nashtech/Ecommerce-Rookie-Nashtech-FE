import axiosInstance from "../../config/axiosInstance.ts";
import { GetSearchPayLoad } from "../../payloads/ProductItemRequests.ts";

const SEARCH = "search";
// const PAGINATED = "search/paginated";

export const getListCategory = async () => {
  const response = await axiosInstance.post(`/category/${SEARCH}`,
    GetSearchPayLoad({
      fieldRequestDtos: [],
      pageRequestDto: null
    })
  );
  return response.data;
};

export const getAllProduct = async () => {
  const response = await axiosInstance.post(`/product/search`,
    GetSearchPayLoad({
      fieldRequestDtos: [],
      pageRequestDto: null
    })
  );
  return response.data;
};

export const getProductItemByProductId = async (id: string) => {
  const response = await axiosInstance.get(`/productItem/product/${id}`);
  return response.data;
};