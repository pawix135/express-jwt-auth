import { Response } from "express";
import { handleError } from "./errors";

export const response = <T>(
  res: Response,
  data: T,
  status?: number
): Response<T> => {
  if (status) res.status(status);
  return res.json(data);
};

export const errorResponse = <T>(
  res: Response,
  data: Partial<T>,
  error: any,
  status: number = 409
) => {
  res.status(status ?? 401);
  return res.json({ ...data, error: handleError(error) });
};
