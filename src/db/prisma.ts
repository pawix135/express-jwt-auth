import { PrismaClient } from "@prisma/client";
import userExtension from "./extensions/user_extension";

const prisma = new PrismaClient().$extends(userExtension);

export { prisma };
