import {useMutation} from "@tanstack/react-query";
import commonAxiosInstance from "../../axios/commonAxiosInstance";

export function QueryPostApproveOrder() {
    return useMutation({
        mutationKey: ["approveOrder"],
        mutationFn: async (data: any) => {
            const response = await commonAxiosInstance.post(`http://localhost:8080/api/v1/order/approve/${data.orderId}`, data);
            return response.data;
        }
    });
}