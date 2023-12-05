import { FieldError } from "..";
import { APIError } from "./";

export interface TokenMiddlewareResponse {
  ok: boolean;
  error?: APIError | FieldError[];
}
