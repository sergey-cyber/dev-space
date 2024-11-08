export class Exeption {
  public message: string;
  public details: string | undefined;
  public status: number | undefined;

  constructor(message: string, status?: number, details?: string) {
    this.message = message;
    this.status = status;
    this.details = details;
  }
}
