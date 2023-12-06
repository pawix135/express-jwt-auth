import { NextFunction, Request, Response } from "express";
import { AuthErrorType } from "./Auth";
import { UserErrorType } from "./User";

type FieldError = {
  message: string;
  field: (string | number)[];
};

type APIError =
  | {
      message: string;
      type: any;
    }
  | FieldError;

interface APIResponse {
  endpoint?: string;
  error?: APIError;
}

export type APIControler<T> = (
  req: Request,
  response: Response<T>,
  next: NextFunction
) => Response | Promise<Response>;
