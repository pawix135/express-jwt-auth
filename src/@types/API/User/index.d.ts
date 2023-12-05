import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { APIError, APIResponse } from "../";

interface UserError extends APIError {}

export interface UserResponse extends APIResponse {
  ok: boolean;
}

export interface UserChangeSettingsResponse extends UserResponse {
  success: boolean;
}

export interface UserChangeEmailResponse extends UserResponse {
  success: boolean;
}

export interface UserChangePasswordResponse extends UserResponse {
  success: boolean;
}

export interface UserChangeUsernameResponse extends UserResponse {
  success: boolean;
}

export interface UserMeResponse extends UserResponse {
  me?: Omit<User, "hash">;
}
