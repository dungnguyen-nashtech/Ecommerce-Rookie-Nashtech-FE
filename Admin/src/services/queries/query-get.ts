import {useQuery} from "@tanstack/react-query";
import {getListRole} from "../api-get";

export function QueryListRole() {
    return useQuery({
        queryKey: ["roles"],
        queryFn: getListRole
    });
}