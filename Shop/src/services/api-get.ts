import axiosInstance from "../config/axiosInstance.ts";
import { GetSearchPayLoad } from "../payloads/ProductItemRequests.ts";

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