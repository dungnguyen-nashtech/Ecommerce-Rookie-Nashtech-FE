import { useQuery } from "@tanstack/react-query";
import { getAllProduct, getListCategory, getProductItemByProductId } from "../apis/api-get.ts";

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

export function QueryProductItemByProductId(productId: string) {
  return useQuery(
    {
      queryKey: ["productItemByProductId", productId],
      queryFn: () => getProductItemByProductId(productId),
      enabled: !!productId
    }
  );
}