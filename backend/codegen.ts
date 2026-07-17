import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://api.hardcover.app/v1/graphql": {
        headers: {
          Authorization: `Bearer ${process.env.HARDCOVER_TOKEN}`,
        },
      },
    },
  ],
  // Your queries/mutations, written inline via the generated `graphql()` tag.
  documents: ["src/**/*.ts", "!src/generated/**/*"],
  ignoreNoDocuments: true, // for better experience with the watcher
  // Emit `.js` extensions on relative imports so output resolves under nodenext ESM.
  emitLegacyCommonJSImports: false,
  generates: {
    "src/generated/": {
      preset: "client",
    },
  },
};

export default config;
