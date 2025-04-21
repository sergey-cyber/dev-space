import { defineConfig } from "cypress";
import dbClientConfig from "./cypress/support/db-client-config";
import { Client } from "pg";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async executeQuery({ sql }: { sql: string }) {
          const client = new Client(dbClientConfig);
          await client.connect();
          await client.query(sql);
          await client.end();
          return null;
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
