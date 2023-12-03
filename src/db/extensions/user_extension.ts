import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { exclude } from "@/utils/db";

const userExtension = Prisma.defineExtension({
  name: "signIn",
  model: {
    user: {
      async signUp(username: string, hash: string) {
        return prisma.user.create({
          data: {
            hash,
            username,
          },
        });
      },
      async signIn(username: string) {
        return prisma.user.findFirst({
          where: {
            username,
          },
        });
      },
      async me(id: number) {
        let user = await prisma.user.findFirst({
          where: {
            id,
          },
        });
        if (!user) return null;

        return exclude(user, ["hash"]);
      },
      async setEmail(id: number, email: string) {
        let checkIfUsed = await prisma.user.findUnique({
          where: {
            id,
            email,
          },
          select: {
            email: true,
          },
        });

        if (email == checkIfUsed?.email!) {
          throw Error("You're already using this email");
        }

        if (checkIfUsed?.email) throw Error("Email already taken!");

        await prisma.user.update({
          where: {
            id,
          },
          data: {
            email,
          },
        });

        return true;
      },
      async setPassword(id: number, hash: string) {
        try {
          await prisma.user.update({
            where: {
              id,
            },
            data: {
              hash,
            },
          });
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      async setUsername(id: number, username: string) {
        try {
          await prisma.user.update({
            where: {
              id,
            },
            data: {
              username,
            },
          });
          return true;
        } catch (error) {
          return false;
        }
      },
    },
  },
});

export default userExtension;
