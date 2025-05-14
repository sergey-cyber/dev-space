import { AddPostButton } from "@/ui/components/self-profile/post/add-post-button";
import { createPostRoute } from "@/routes/self/post";

describe("AddPostButton", () => {
  it("should render add button with correct link and text", () => {
    cy.mount(<AddPostButton />);
    
    cy.get("a")
      .should("have.attr", "href", createPostRoute.getPath())
      .and("contain", "Добавить")
      .find("svg")
      .should("exist");
  });
}); 