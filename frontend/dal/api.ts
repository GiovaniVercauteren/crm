import { getAccessToken } from "@/lib/auth";
import ky, { BeforeRequestState, KyRequest, NormalizedOptions } from "ky";

export const api = ky.create({
  prefixUrl: process.env.BACKEND_URL,
  hooks: {
    beforeRequest: [attachAccessToken],
  },
});

async function attachAccessToken(
  request: KyRequest,
  _options: NormalizedOptions,
  { retryCount }: BeforeRequestState,
) {
  if (retryCount === 0) {
    const accessToken = await getAccessToken();
    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
    }
  }
}
