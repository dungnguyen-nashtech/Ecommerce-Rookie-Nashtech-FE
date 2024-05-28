import { useMutation } from "@tanstack/react-query";
import { postLogin, postRegister } from "../api-post.ts";
import { IFormLogin, IFormRegister } from "../../payloads/interface/formInput.ts";


export function QueryPostLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: IFormLogin) => postLogin(data)
  });
}

export function QueryPostRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IFormRegister) => postRegister(data)
  });
}