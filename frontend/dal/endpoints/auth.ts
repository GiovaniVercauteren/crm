import { SignInDto, SignUpDto, UserEntity } from "@/lib/client";
import { api } from "../api";

export const signIn = async (data: SignInDto) => {
  const accessToken = await api
    .post<string>("auth/sign-in", { json: data })
    .text();
  return accessToken;
};

export const signUp = async (data: SignUpDto) => {
  await api.post("auth/sign-up", { json: data });
};

export const signOut = async () => {
  await api.post("auth/sign-out");
};

export const getCurrentUser = async () => {
  const user = await api.get<UserEntity>("auth/me").json();
  return user;
};
