import { UpdateUserDto, UserEntity } from "@/lib/client";
import { api } from "../api";

export const updateAccount = async (
  data: UpdateUserDto,
): Promise<UserEntity> => {
  const updatedUser = await api
    .patch<UserEntity>("account", { json: data })
    .json();
  return updatedUser;
};
