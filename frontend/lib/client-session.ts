import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import z from "zod";

export type ClientSession = {
  session?: z.infer<typeof schemas.SessionDto>;
  permissions?: z.infer<typeof schemas.PermissionsDto>;
};

async function getClientIronSession() {
  const sessionPassword = process.env.IRON_SESSION_PASSWORD;
  if (!sessionPassword) {
    throw new Error(
      "IRON_SESSION_PASSWORD is not defined in environment variables.",
    );
  }

  const userSession = await getIronSession<ClientSession>(await cookies(), {
    password: sessionPassword,
    cookieName: "client-session",
    cookieOptions: {
      expires: undefined, // Let the cookie expire when the browser session ends
    },
  });

  if (!userSession) {
    throw new Error("Failed to get iron session.");
  }

  return userSession;
}

export async function getClientSession() {
  try {
    const clientSession = await getClientIronSession();
    return clientSession;
  } catch (error) {
    console.error("Failed to parse client session cookie:", error);
    return null;
  }
}

export async function setClientSession() {
  try {
    const clientSession = await getClientIronSession();
    const sessionData = await api.session();
    const permissionsData = await api.permissions();

    clientSession.session = sessionData;
    clientSession.permissions = permissionsData;
    await clientSession.save();
  } catch (error) {
    console.error("Failed to set client session cookie:", error);
  }
}

export async function clearClientSession() {
  try {
    const clientSession = await getClientIronSession();
    clientSession.destroy();
  } catch (error) {
    console.error("Failed to clear client session cookie:", error);
  }
}

export async function isClientSessionAuthenticated() {
  const clientSession = await getClientSession();
  return !!clientSession?.session?.sub;
}

export async function hasClientPermission(permission: string) {
  const clientSession = await getClientSession();
  if (!clientSession) {
    return false;
  }
  const allPermissions: Set<string> = new Set(
    clientSession.permissions?.permissions || [],
  );
  clientSession.permissions?.bundles.forEach((bundle) => {
    BundlePermissions[bundle]?.forEach((perm) => allPermissions.add(perm));
  });
  return allPermissions.has(permission);
}
