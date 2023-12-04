import { Response } from "express";

export const response = <T>(
  res: Response,
  data: T,
  status?: number
): Response<T> => {
  if (status) res.status(status);
  return res.json(data);
};
