import express from "express";

declare global {
  namespace Express {
    interface Request {
      context: {
        id: number;
      };
    }
  }
}
