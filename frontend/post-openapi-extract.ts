import fs from "fs/promises";

const content = await fs
  .readFile("./lib/client.generated.ts", "utf-8")
  .catch((error) => {
    console.error("Error reading client.generated.ts:", error);
    return "";
  });

const fixedContent = content.replace(
  /(method:\s*"post",\s+path:\s*"[^"]+",)(?![^}]*parameters:)/g,
  `$1
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.void(),
      },
    ],`,
);

fs.writeFile("./lib/client.generated.ts", fixedContent, "utf-8").catch(
  (error) => {
    console.error("Error writing to client.generated.ts:", error);
  },
);

console.log(
  "✅ Success: Injected z.void() parameters into empty POST endpoints.",
);

console.log("Extracting bundle permissions from OpenAPI spec...");

const spec = JSON.parse(await fs.readFile("./openapi-spec.json", "utf-8"));

const output = `\n/** Appended bundle permissions from OpenAPI spec */
\nexport const BundlePermissions = ${JSON.stringify(
  spec.components.schemas.PermissionsDto["x-bundle-permissions"],
  undefined,
  2,
)}`;

await fs
  .appendFile("./lib/client.generated.ts", output, "utf-8")
  .catch((error) => {
    console.error("Error appending to client.generated.ts:", error);
  });

console.log("Bundle permissions extracted and appended to client.generated.ts");
