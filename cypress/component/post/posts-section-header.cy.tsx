import { PostsSectionHeader } from "@/ui/components/self-profile/post/posts-header";
import { Roles } from "@/entity/role/roles";

describe("PostsSectionHeader", () => {
  it("should show add button for admin role", () => {
    cy.mount(<PostsSectionHeader userRole={Roles.ADMIN} />);

    cy.get("[data-test=add-post-button]").should("exist");
  });

  it("should show add button for author role", () => {
    cy.mount(<PostsSectionHeader userRole={Roles.AUTHOR} />);

    cy.get("[data-test=add-post-button]").should("exist");
  });

  it("should show warning message for users without required roles", () => {
    cy.mount(<PostsSectionHeader userRole="user" />);

    cy.get("[data-test=no-access-alert]").should("exist");

    cy.get("[data-test=add-post-button]").should("not.exist");
  });

  it("should show warning message when no role is provided", () => {
    cy.mount(<PostsSectionHeader />);

    cy.get("[data-test=no-access-alert]").should("exist");

    cy.get("[data-test=add-post-button]").should("not.exist");
  });
});
