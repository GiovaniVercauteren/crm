import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./openapi-spec.json", // sign up at app.heyapi.dev
  output: "lib/client",
  plugins: [
    {
      name: "@hey-api/sdk",
    },
    {
      name: "@hey-api/client-next",
      runtimeConfigPath: "../hey-api",
    },
  ],
});
