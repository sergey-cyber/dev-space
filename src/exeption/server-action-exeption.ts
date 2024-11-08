import { UiReadableExeption } from "./ui-readable-exeption";

export class ServerActionExeption extends UiReadableExeption {
  constructor(message: string, status?: number) {
    super(message, status);
  }
}
