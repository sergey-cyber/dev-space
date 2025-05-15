import { mount } from "cypress/react";
import { ThemeProvider } from "next-themes";
import "./commands";
import "../../src/app/globals.css";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", (component, options = {}) => {
  const wrapped = <ThemeProvider attribute="class">{component}</ThemeProvider>;
  return mount(wrapped, options);
});
