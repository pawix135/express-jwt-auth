import { Response } from "express";

export const response = <T>(res: Response, data: T): Response<T> => {
  return res.json(data);
};
