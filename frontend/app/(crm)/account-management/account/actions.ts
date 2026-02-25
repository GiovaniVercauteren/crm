"use server";

import { getAccount, updateAccount } from "@/dal/endpoints/account";
import { getCurrentUser } from "@/dal/endpoints/auth";
import { UpdateUserDto } from "@/lib/client";
import { throwServerActionError } from "@/lib/utils";

export async function fetchAccountAction() {
  try {
    const user = await getAccount();
    return user;
  } catch (error) {
    await throwServerActionError(error);
  }
}

export async function updateAccountAction(data: UpdateUserDto) {
  try {
    const updatedUser = await updateAccount(data);
    return updatedUser;
  } catch (error) {
    await throwServerActionError(error);
  }
}
