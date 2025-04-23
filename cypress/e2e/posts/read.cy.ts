import post from "../../fixtures/post/simple-post.json";
import user from "../../fixtures/user/simple-user.json";
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

describe("Read post", () => {
  it("Read simple post", () => {
    cy.task("executeQuery", {
      sql: `
        ${query.users.create({ data: user })}
        ${query.posts.create({ data: post })}
      `,
    }).then(() => {
      cy.visit(`/posts/${post.id}`);
      const postSelector = "[data-test='post']";
      cy.get(postSelector + " [data-test='title']").should(
        "have.text",
        post.title,
      );
      cy.get(postSelector + " [data-test='content']").should(
        "have.text",
        post.content,
      );
      cy.get(postSelector + " [data-test='author-name']").should(
        "have.text",
        user.name,
      );
      cy.get(postSelector + " [data-test='created-at']").should("be.visible");
      cy.get(postSelector + " [data-test='views']").should("have.text", 2);
    });
  });

  // TODO: need to implement "Not found post" test
});
