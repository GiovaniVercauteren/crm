"use server";

import { updateAccessTokenAction } from "@/app/_actions/update-token.action";
import { getAccount, updateAccount } from "@/dal/endpoints/account";
import { sendVerificationEmail } from "@/dal/endpoints/auth";
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
    await updateAccessTokenAction();
    return updatedUser;
  } catch (error) {
    await throwServerActionError(error);
  }
}

export async function sendVerificationEmailAction() {
  try {
    return await sendVerificationEmail();
  } catch (error) {
    await throwServerActionError(error);
  }
}
