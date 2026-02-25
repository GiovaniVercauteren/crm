"use server";

import { getCurrentUser } from "@/dal/endpoints/auth";
import { FormState } from "@/lib/types";

export async function fetchProfileAction() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
}

export async function updateProfileAction(
  _prevState: FormState<unknown>,
  formData: FormData,
) {
  const values = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  };
  // Implement profile update logic here, e.g., call an API endpoint to update the user's profile
  // You can extract data from formData and send it to the backend
  return { values, success: true };
}
