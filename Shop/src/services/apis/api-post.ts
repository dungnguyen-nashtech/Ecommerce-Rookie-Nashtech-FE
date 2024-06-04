import axiosInstance from "../../config/axiosInstance.ts";
import { IFormLogin, IFormRegister } from "../../payloads/interface/formInput.ts";

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

export const postActiveAccount = async (data: { email: string, verificationCode: string }) => {
  const response = await axiosInstance.post(`/auth/active`,
    {
      email: data.email,
      verificationCode: data.verificationCode
    }
  );
  return response.data;
};

export const postCreateOrder = async (data: { order: object, orderDetails: object[] }) => {
  const response = await axiosInstance.post(`/order`, {
    order: data.order,
    orderDetails: data.orderDetails
  });
  return response.data;
};

export const postCanUserComment = async (data: { productId: string, userId: string }) => {
  const response = await axiosInstance.post(`/order/canUserComment`, {
    productId: data.productId,
    userId: data.userId
  });
  return response.data;
};

export const postCreateAddressForUser = async (data: any) => {
  const response = await axiosInstance.post(`/address`,
    data
  );
  return response.data;
};