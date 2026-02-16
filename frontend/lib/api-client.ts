import { createApiClient } from "./client.generated";
import { cookies } from "next/headers";
import { parse } from "set-cookie-parser";

const apiClient = createApiClient("http://127.0.0.1:4000");

apiClient.axios.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  if (sessionCookie) {
    config.headers["Cookie"] = `session=${sessionCookie.value}`;
  }
  return config;
});

apiClient.axios.interceptors.response.use(async (response) => {
  const setCookieHeader = response.headers["set-cookie"];
  if (setCookieHeader) {
    const sessionCookie = setCookieHeader.find((cookie: string) =>
      cookie.startsWith("session="),
    );
    if (sessionCookie) {
      const cookieStore = await cookies();
      const cookie = parse(sessionCookie, { decodeValues: false })[0];
      cookieStore.set({
        name: cookie.name,
        value: cookie.value,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        path: cookie.path,
        maxAge: cookie.maxAge,
        expires: cookie.expires,
        sameSite: cookie.sameSite as "lax" | "strict" | "none",
        domain: cookie.domain,
      });
    }
  }
  return response;
});

export default apiClient;
