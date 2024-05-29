import { useQuery } from "@tanstack/react-query";
import { getListCategory } from "../apis/api-get.ts";

export function QueryListCategory() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getListCategory
  });
}