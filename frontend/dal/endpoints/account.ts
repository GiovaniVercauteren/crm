import { UpdateUserDto, UserEntity } from "@/lib/client";
import { api } from "../api";

export const getAccount = async (): Promise<UserEntity> => {
  const user = await api.get<UserEntity>("account").json();
  return user;
};

export const updateAccount = async (
  data: UpdateUserDto,
): Promise<UserEntity> => {
  const updatedUser = await api
    .patch<UserEntity>("account", { json: data })
    .json();
  return updatedUser;
};
