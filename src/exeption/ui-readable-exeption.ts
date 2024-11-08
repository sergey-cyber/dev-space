import { Exeption } from "./exeption";

export class UiReadableExeption {
  public error: Exeption;

  constructor(message: string, status?: number) {
    this.error = new Exeption(message, status);
  }

  /**
   * When trying to return an instance of a class from the server side to the client side, a serialization error will occur.
   * This method solves this problem
   */
  public asPlainObject() {
    try {
      return JSON.parse(JSON.stringify(this));
    } catch (err) {
      throw Error("Error when parsing server action exeption");
    }
  }
}
