import { useMutation } from "@tanstack/react-query";
import { IFieldRequestDto, IFormLogin } from "../../payloads/interface/formInput.ts";
import { postLogin } from "../api-post.ts";
import { searchOneFilter } from "../api-search.ts";

export function QuerySearchOneFilter() {
  return useMutation({
    mutationKey: ["searchOneFilter"],
    mutationFn: (data: IFieldRequestDto) => searchOneFilter(data)
  });
}