import { useMutation } from "@tanstack/react-query";
import { deleteRating } from "../apis/api-delete.ts";

export function QueryDeleteRating() {
  return useMutation({
    mutationKey: ["deleteRating"],
    mutationFn: (ratingId: string) => deleteRating(ratingId)
  });
}