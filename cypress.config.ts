import { defineConfig } from "cypress";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async executeQuery({ sql }: { sql: string }) {
          const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: false,
          });
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
