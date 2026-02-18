import { type CreateClientConfig } from "./client/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: "http://127.0.0.1:4000", // Update this to your backend URL
});
