import { client } from "./client/client.gen";
import { ResolvedRequestOptions } from "./client/client/types.gen";
import { cookies } from "next/headers";

async function appendAccessToken(request: ResolvedRequestOptions) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
}

client.interceptors.request.use(appendAccessToken);
