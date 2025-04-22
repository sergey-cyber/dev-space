import user from "../../fixtures/user/simple-user.json";
import post from "../../fixtures/post/simple-post.json";
import { query } from "../../support/db/query";

afterEach(() => {
  cy.task("executeQuery", {
    sql: `
      ${query.users.clearTable()}
      ${query.posts.clearTable()}
    `,
  });
});

describe("Search posts", () => {
  it("Simple display list of posts", () => {
    cy.task("executeQuery", {
      sql: `
        ${query.users.create({ data: user })}
        ${query.posts.create({ data: post })}
      `,
    }).then(() => {
      cy.visit("/posts");
    });
  });
});
