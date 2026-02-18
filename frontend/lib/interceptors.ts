import { client } from "./client/client.gen";
import { ResolvedRequestOptions } from "./client/client/types.gen";
import { parse } from "set-cookie-parser";
import { cookies } from "next/headers";

async function appendAccessToken(request: ResolvedRequestOptions) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    request.headers = {
      ...request.headers,
      Cookie: `access_token=${accessToken}`,
    };
  }
}

async function extractAccessToken(response: Response) {
  const headers = response.headers;
  const setCookie = headers.getSetCookie();
  const parsedCookies = parse(setCookie);

  const accessTokenCookie = parsedCookies.find(
    (cookie) => cookie.name === "access_token",
  );

  if (accessTokenCookie) {
    const cookieStore = await cookies();
    cookieStore.set("access_token", accessTokenCookie.value, {
      ...accessTokenCookie,
      sameSite: accessTokenCookie.sameSite as
        | "lax"
        | "strict"
        | "none"
        | undefined,
    });
  }

  return response;
}

client.interceptors.request.use(appendAccessToken);
client.interceptors.response.use(extractAccessToken);
