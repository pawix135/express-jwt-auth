import { NextFunction, Request, Response } from "express";

interface UserController {
  [key: string]: (
    req: Request,
    response: Response,
    next: NextFunction
  ) => void | Promise<void>;
}

export const userController: UserController = {
  GET_ME: (req, res) => {
    res.json(req.context.id);
  },
} as const;
