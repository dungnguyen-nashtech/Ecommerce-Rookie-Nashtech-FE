import {useQuery} from "@tanstack/react-query";
import {getAllVariation, getListRole} from "../api-get";

export function QueryListRole() {
    return useQuery({
        queryKey: ["roles"],
        queryFn: getListRole
    });
}

export function QueryAllVariation() {
    return useQuery({
        queryKey: ["variations"],
        queryFn: getAllVariation
    });
}