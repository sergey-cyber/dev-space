import { defineConfig } from "cypress";
import dbClientConfig from "./cypress/support/db-client-config";
const { Client } = require("pg");

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async connectDB(query) {
          const client = new Client(dbClientConfig);
          await client.connect();
          const sql = `
    INSERT INTO posts (id, title, content, authorId, createdAt, updatedAt, publishedAt, views)
    VALUES (
      'cuid1', -- уникальный идентификатор поста
      'Example Post', -- заголовок поста
      'This is an example post content.', -- содержимое поста
      'user1', -- идентификатор автора поста
      '2023-10-01T12:00:00Z', -- дата создания поста
      '2023-10-01T12:00:00Z', -- дата последнего обновления поста
      '2023-10-01T12:00:00Z', -- дата публикации поста
      0 -- количество просмотров поста
    );
  `;
          const res = await client.query();
          await client.end();
          return res.rows;
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
