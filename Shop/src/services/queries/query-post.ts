import { useMutation } from "@tanstack/react-query";
import { postActiveAccount, postLogin, postRegister } from "../api-post.ts";
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

export function QueryPostActiveAccount() {
  return useMutation({
    mutationKey: ["activeAccount"],
    mutationFn: (data: { email: string, verificationCode: string }) => postActiveAccount(data)
  });
}