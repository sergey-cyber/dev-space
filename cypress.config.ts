import { defineConfig } from "cypress";
import dotenv from "dotenv";

import { executeQuery } from "./cypress/support/plugin/executeQuery";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async executeQuery({ sql }: { sql: string }) {
          return await executeQuery({
            sql,
            clientConfig: {
              connectionString: process.env.DATABASE_URL,
              ssl: false,
            },
          });
        },
      });
    },
    baseUrl: "http://localhost:3001",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
