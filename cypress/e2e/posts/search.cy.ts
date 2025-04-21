import post from "../../fixtures/posts/simple-post.json";
import user from "../../fixtures/users/simple-user.json";

describe("Search posts", () => {
  it("Simple display list of posts", () => {
    cy.task("connectDB", "SELECT NOW()").then((res) => {
      cy.log(res[0].now);
      cy.visit("/posts");
    });
  });
});
