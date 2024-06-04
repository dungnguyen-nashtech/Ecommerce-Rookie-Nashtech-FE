import { useQuery } from "@tanstack/react-query";
import {
  getAddressByUserId,
  getAllProduct,
  getListCategory,
  getProductByCategoryName,
  getProductItemByProductId,
  getProductItemFilterPagination,
  getProductPagination
} from "../apis/api-get.ts";

export function QueryListCategory() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getListCategory
  });
}

export function QueryAllProduct() {
  return useQuery({
    queryKey: ["allProduct"],
    queryFn: getAllProduct
  });
}

export function QueryProductPagination(page: number) {
  return useQuery({
    queryKey: ["productPagination", page],
    queryFn: () => getProductPagination(page)
  });
}

export function QueryProductItemFilterPagination(fieldRequestDtos: any[], sortType: string, sortField: string) {

  return useQuery({
    queryKey: ["ProductItemFilterPagination"],
    queryFn: () => getProductItemFilterPagination(fieldRequestDtos, sortType, sortField)
  });
}

export function QueryProductItemByProductId(productId: string) {
  return useQuery(
    {
      queryKey: ["productItemByProductId", productId],
      queryFn: () => getProductItemByProductId(productId),
      enabled: !!productId
    }
  );
}

export function QueryGetProductByCategoryName(categoryName: string) {
  return useQuery(
    {
      queryKey: ["getProductByCategoryName", categoryName],
      queryFn: () => getProductByCategoryName(categoryName),
      enabled: !!categoryName
    }
  );
}

export function QueryGetAddressByUserId(userId: string) {
  return useQuery(
    {
      queryKey: ["getAddressByUserId", userId],
      queryFn: () => getAddressByUserId(userId),
      enabled: !!userId
    }
  );
}