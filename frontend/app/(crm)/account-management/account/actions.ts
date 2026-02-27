"use server";

import { updateAccessTokenAction } from "@/app/_actions/update-token.action";
import { getAccount, updateAccount } from "@/dal/endpoints/account";
import { sendVerificationEmail } from "@/dal/endpoints/auth";
import { UpdateUserDto, UserEntity } from "@/lib/client";
import { ServerActionResult } from "@/lib/types";
import { generateErrorMessage } from "@/lib/utils";

export async function fetchAccountAction(): Promise<
  ServerActionResult<UserEntity>
> {
  try {
    const user = await getAccount();
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: await generateErrorMessage(error) };
  }
}

export async function updateAccountAction(
  data: UpdateUserDto,
): Promise<ServerActionResult<UserEntity>> {
  try {
    const updatedUser = await updateAccount(data);
    await updateAccessTokenAction();
    return { success: true, data: updatedUser };
  } catch (error) {
    return { success: false, error: await generateErrorMessage(error) };
  }
}

export async function sendVerificationEmailAction(): Promise<ServerActionResult> {
  try {
    await sendVerificationEmail();
    return { success: true };
  } catch (error) {
    return { success: false, error: await generateErrorMessage(error) };
  }
}
