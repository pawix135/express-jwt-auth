import { testErrors } from "@/constants/errors";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/constants/validation";
import { z } from "zod";

export const UsernameSchema = z
  .string({
    description: "Username",
    required_error: testErrors["username"]["required"],
    invalid_type_error: testErrors["username"]["invalid_type"],
  })
  .min(USERNAME_MIN_LENGTH, testErrors["username"]["min_length"])
  .max(USERNAME_MAX_LENGTH, testErrors["username"]["max_length"]);

export const PasswordSchema = z
  .string({
    description: "Password",
    required_error: testErrors["password"]["required"],
    invalid_type_error: testErrors["password"]["invalid_type"],
  })
  .min(PASSWORD_MIN_LENGTH, testErrors["password"]["min_length"])
  .max(PASSWORD_MAX_LENGTH, testErrors["password"]["max_length"]);

export const EmailSchema = z
  .string({
    description: "Email",
    invalid_type_error: testErrors["email"]["invalid"],
    required_error: testErrors["email"]["required"],
  })
  .max(EMAIL_MAX_LENGTH)
  .email(testErrors["email"]["invalid"]);
