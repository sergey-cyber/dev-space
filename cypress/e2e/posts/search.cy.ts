describe("Search posts", () => {
  it("Simple display list of posts", () => {
    cy.task("executeQuery", {
      sql: getSql(),
    }).then((e) => {
      cy.visit("/posts");
    });
  });
});

function getSql() {
  return `
    TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;
    TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE;
    INSERT INTO "User" (id, name, email, "createdAt", "updatedAt")
      VALUES (
        'user1',
        'Simple user',
        'test@mail.ru',
        '2023-10-01T12:00:00Z',
        '2023-10-01T12:00:00Z'
      );
      INSERT INTO "Post" (id, title, content, "authorId", "createdAt", "updatedAt")
      VALUES (
        'cuid1',
        'Example Post 1',
        'This is an example post content.',
        'user1',
        '2023-10-01T12:00:00Z',
        '2023-10-01T12:00:00Z'
      );
  `;
}
