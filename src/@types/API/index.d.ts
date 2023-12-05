import { NextFunction, Request, Response } from "express";
import { AuthErrorType } from "./Auth";
import { UserErrorType } from "./User";

type FieldError = {
  message: string;
  field: (string | number)[];
};

interface APIError {
  message: string;
  type: any;
}

interface APIResponse {
  endpoint?: string;
  error?: APIError | FieldError[];
}

export type APIControler<T> = (
  req: Request,
  response: Response<T>,
  next: NextFunction
) => Response | Promise<Response>;
