import { IFieldRequestDto } from "../../payloads/interface/formInput.ts";
import axiosInstance from "../../config/axiosInstance.ts";
import { GetSearchPayLoad } from "../../payloads/ProductItemRequests.ts";


export const searchOneFilter = async (data: IFieldRequestDto, url: string) => {
  const response = await axiosInstance.post(url,
    GetSearchPayLoad({
      fieldRequestDtos: [
        {
          field: data.field,
          operator: data.operator,
          value: data.value
        }
      ],
      pageRequestDto: null
    })
  );
  return response.data;
};