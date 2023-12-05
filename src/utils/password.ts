import { hash } from "bcrypt";

export const createPasswordHash = async (password: string) => {
  return await hash(password, 10);
};
