import axiosInstance from "../../config/axiosInstance.ts";

export const deleteRating = async (ratingId: string) => {
  const response = await axiosInstance.delete(`/rating/${ratingId}`);
  return response.data;
};