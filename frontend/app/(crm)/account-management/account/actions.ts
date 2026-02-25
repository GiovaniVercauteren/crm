"use server";

import { updateAccount } from "@/dal/endpoints/account";
import { getCurrentUser } from "@/dal/endpoints/auth";
import { UpdateUserDto } from "@/lib/client";
import { throwServerActionError } from "@/lib/utils";

export async function fetchProfileAction() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
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
