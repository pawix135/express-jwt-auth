import { testErrors } from "@/constants/errors";

export class AuthError extends Error {
  readonly code: number;
  readonly errorMessage: string;

  constructor(code: number) {
    const errorMessage = AuthError.getErrorMessage(code);
    super(errorMessage);
    this.name = this.constructor.name;
    this.code = code;
    this.errorMessage = errorMessage;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  private static getErrorMessage(errorCode: number): string {
    return testErrors["auth"][errorCode as keyof (typeof testErrors)["auth"]];
  }
}
