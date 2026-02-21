import { isAuthenticated, getUser } from "@/lib/auth";
import { UserEntity } from "@/lib/client";

export type VerifiedSession = {
  user: UserEntity;
};

export const verifySession = async (): Promise<VerifiedSession | null> => {
  if (await isAuthenticated()) {
    const user = await getUser();

    if (user) {
      return { user };
    }
  }

  return null;
};
