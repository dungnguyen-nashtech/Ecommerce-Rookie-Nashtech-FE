import { useMutation } from "@tanstack/react-query";
import { IFieldRequestDto } from "../../payloads/interface/formInput.ts";
import { searchOneFilter } from "../apis/api-search.ts";


interface SearchOneFilterArgs {
  data: IFieldRequestDto;
  url: string;
}

export function QuerySearchOneFilter() {
  return useMutation({
    mutationKey: ["searchOneFilter"],
    mutationFn: ({ data, url }: SearchOneFilterArgs) => searchOneFilter(data, url)
  });
}