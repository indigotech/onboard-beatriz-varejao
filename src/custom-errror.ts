export class CustomError extends Error {
  code: number;
  details?: string;

  constructor(message: string, code: number, details?: string) {
    super(message);
    this.code = code;
    this.details = details;
  }
}