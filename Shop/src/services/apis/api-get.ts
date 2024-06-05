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

export const getProductPagination = async (page: number) => {

  const response = await axiosInstance.post(`/product/search/paginated`,
    GetSearchPayLoad({
      fieldRequestDtos: [],
      pageRequestDto: {
        pageNo: page,
        pageSize: 6,
        sort: "DESC",
        sortByColumn: "createdOn"
      }
    })
  );
  return response.data;

};

export const getProductItemFilterPagination = async (
  fieldRequestDtos: any[]
  , sortType: string
  , sortField: string) => {

  const response = await axiosInstance.post(`/productItem/search/paginated`,
    GetSearchPayLoad({
      fieldRequestDtos: fieldRequestDtos,
      pageRequestDto: {
        pageNo: 1,
        pageSize: 100,
        sort: sortType,
        sortByColumn: sortField
      }
    })
  );
  return response.data;

};

export const getProductByCategoryName = async (categoryName: string) => {
  const response = await axiosInstance.post(`/product/category`, {
    name: categoryName
  });
  return response.data;
};

export const getProductItemByProductId = async (id: string) => {
  const response = await axiosInstance.get(`/productItem/product/${id}`);
  return response.data;
};

export const getAddressByUserId = async (id: string) => {
  const response = await axiosInstance.get(`/address/user/${id}`);
  return response.data;
};

export const getOrderDetailsByUserId = async (id: string) => {
  const response = await axiosInstance.get(`/orderDetail/user/${id}`);
  return response.data;
};