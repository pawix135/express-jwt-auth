import { Prisma } from "@prisma/client";
import { Response } from "express";
import { response } from "./response";

export const handleError = <T>(res: Response, error: any, data: T) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code == "P2002") {
      return response<T>(res, data, 401);
    } else {
      return response<T>(res, data, 401);
    }
  } else {
    return response<T>(res, data, 401);
  }
};
