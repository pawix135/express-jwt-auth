import { NextFunction, Request, Response } from "express";

// Incoming requests logger
const logger = (req: Request, _res: Response, next: NextFunction) => {
  let date = new Date();
  let formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  let output = `${formattedDate} | METHOD: ${req.method} | ${req.path} | ${req.headers["content-length"]} BYTES | HTTP/${req.httpVersion}`;

  console.debug(output);
  next();
};

export default logger;
