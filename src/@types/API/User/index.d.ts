import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

type UserAccount =
  | "user_not_found"
  | "email_taken"
  | "password_change_error"
  | "password_too_short"
  | "username_taken"
  | "same_email";
type UserMiscError = "internal_error" | "database_error";

type UserErrorType = UserAccount | UserMiscError;

interface UserError extends APIError<UserErrorType> {}

export interface UserResponse extends APIResponse<UserError> {
  ok: boolean;
  me?: Omit<User, "hash">;
}

export type UserController = (
  req: Request,
  response: Response<UserResponse>,
  next: NextFunction
) => Response | Promise<Response>;
