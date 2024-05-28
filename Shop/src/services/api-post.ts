import axiosInstance from "../config/axiosInstance.ts";
import { IFormLogin, IFormRegister } from "../payloads/interface/formInput.ts";

export const postLogin = async (data: IFormLogin) => {
  const response = await axiosInstance.post(`/auth/login`,
    {
      email: data.email,
      password: data.password
    } as IFormLogin
  );
  return response.data;
};

export const postRegister = async (data: IFormRegister) => {
  const response = await axiosInstance.post(`/auth/register`,
    {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    } as IFormRegister
  );
  return response.data;
};