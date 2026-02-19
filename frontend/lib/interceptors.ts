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
  console.log(
    "[interceptor] runtime:",
    typeof window === "undefined" ? "server" : "browser",
  );
  console.log(
    "[interceptor] set-cookie count:",
    response.headers.getSetCookie?.().length ?? 0,
  );
  const headers = response.headers;
  const setCookie = headers.getSetCookie();
  const parsedCookies = parse(setCookie);

  // TEMPORARY: Log the parsed cookies to debug the issue
  console.log("Parsed cookies from response:", JSON.stringify(parsedCookies));

  const accessTokenCookie = parsedCookies.find(
    (cookie) => cookie.name === "access_token",
  );

  if (accessTokenCookie) {
    console.log(
      "Setting access token cookie:",
      JSON.stringify(accessTokenCookie),
    );
    const cookieStore = await cookies();
    cookieStore.set("access_token", accessTokenCookie.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: accessTokenCookie.maxAge,
    });
  }

  return response;
}

client.interceptors.request.use(appendAccessToken);
client.interceptors.response.use(extractAccessToken);
