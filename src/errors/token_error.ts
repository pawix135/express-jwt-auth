import { testErrors } from "@/constants/errors";

export class TokenError extends Error {
  readonly code: number;
  readonly errorMessage: string;

  constructor(code: number) {
    const errorMessage = TokenError.getErrorMessage(code);
    super(errorMessage);
    this.name = this.constructor.name;
    this.code = code;
    this.errorMessage = errorMessage;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  private static getErrorMessage(errorCode: number): string {
    return testErrors["token"][errorCode as keyof (typeof testErrors)["token"]];
  }
}
