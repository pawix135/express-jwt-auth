import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { APIError, FieldError } from "@/@types/API";
import { TokenError } from "@/errors/token_error";
import { AuthError } from "@/errors/auth_error";

// TODO
/**
 * Extend Prisma erros
 * Extend Zod erros
 * Custom error handling
 */
export const handleError = (
  error: any,
  customError?: APIError
): APIError | FieldError[] => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    let targets = error.meta?.target as (string | number)[];
    let fields = (error.meta?.target as (string | number)[]) ?? [];
    switch (error.code) {
      case "P2004": // Constraint failed on the database
      case "P2002": // Unique constraint
        let createError: FieldError = {
          field: fields,
          message: `${targets.join(", ")} are already taken!`,
        };
        return [createError];
      // The provided value for the column is too long
      case "P2000":
        return {
          type: "internal_error",
          message: "Some fields are too long!",
        };
      // Invalid field type
      case "P2006":
        return {
          type: "internal_error",
          message: "Invalid type provided!",
        };
      default:
        return {
          message: "other prisma error",
          type: "internal_error",
        };
    }
  } else if (error instanceof ZodError) {
    let mapErrors: FieldError[] = error.issues.map((issue) => ({
      field: issue.path,
      message: issue.message,
    }));
    return mapErrors;
  } else if (error instanceof TokenError) {
    return {
      message: error.message,
      type: "invalid_token",
    };
  } else if (error instanceof AuthError) {
    console.log("auth error", error);

    return {
      message: error.message,
      type: "auth_error",
    };
  } else if (customError) {
    return customError;
  } else {
    return {
      message: "Something else gone wrong! Internal error! Panic!",
      type: "internal_error",
    };
  }
};
