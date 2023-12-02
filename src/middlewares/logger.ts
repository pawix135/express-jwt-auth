import { NextFunction, Request, Response } from "express";

const logger = (req: Request, _res: Response, next: NextFunction) => {
  let output = `[${req.method}] ${req.path} HTTP/${req.httpVersion}`;
  console.info(output);
  next();
};

export default logger;
