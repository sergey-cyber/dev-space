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

post.authorId = user.id;

describe("Search posts", () => {
  it("Display list of posts", () => {
    cy.task("executeQuery", {
      sql: `
        ${query.users.create({ data: user })}
        ${query.posts.create({ data: post })}
      `,
    }).then(() => {
      cy.visit("/posts");
      const postListItemSelector = "[data-test='post-list-item']";
      cy.get(postListItemSelector).should("have.length", 1);
      cy.get(postListItemSelector + " [data-test='author-name']").should(
        "have.text",
        user.name,
      );
      cy.get(postListItemSelector + " [data-test='title']").should(
        "have.text",
        post.title,
      );
      cy.get(postListItemSelector + " [data-test='created-at']").should(
        "be.visible",
      );
    });
  });

  it("Empty list", () => {
    cy.visit("/posts");
    cy.get("[data-test='empty-list']").should("be.visible");
  });
});
