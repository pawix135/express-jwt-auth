import { Express, Response } from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";

declare module "*.txt" {
  const content: string;
  export default content;
}

declare module "jsonwebtoken" {
  interface JwtPayload {
    username: string;
    id: number;
    email: string;
  }
}
