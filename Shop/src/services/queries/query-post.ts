import { useMutation } from "@tanstack/react-query";
import {
  postActiveAccount,
  postCanUserComment,
  postCreateAddressForUser,
  postCreateOrder,
  postCreateRating,
  postLogin,
  postLogout,
  postRegister,
  postUpdateAddressForUser
} from "../apis/api-post.ts";
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

export function QueryPostCreateOrder() {
  return useMutation({
    mutationKey: ["createOrder"],
    mutationFn: (data: any) => postCreateOrder(data)
  });
}

export function QueryCanUserComment() {
  return useMutation({
    mutationKey: ["canUserComment"],
    mutationFn: (data: any) => postCanUserComment(data)
  });
}

export function QueryPostCreateAddressForUser() {
  return useMutation({
    mutationKey: ["createAddressForUser"],
    mutationFn: (data: any) => postCreateAddressForUser(data)
  });
}

export function QueryPostUpdateAddressForUser() {
  return useMutation({
    mutationKey: ["updateAddressForUser"],
    mutationFn: (data: any) => postUpdateAddressForUser(data)
  });
}

export function QueryPostCreateRating() {
  return useMutation({
    mutationKey: ["createRating"],
    mutationFn: (data: any) => postCreateRating(data)
  });
}

export function QueryPostLogout(email: string) {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => postLogout(email)
  });
}