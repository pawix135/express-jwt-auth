import { UserController } from "@/@types/API/User";
import { prisma } from "@/db/prisma";

export const GET_ME: UserController = async (req, res) => {
  console.log(req.headers.authorization);

  let user = await prisma.user.me(req.context.id);

  if (!user) {
    return res.json({
      ok: false,
      endpoint: req.path,
      error: { message: "User not found", type: "user_not_found" },
    });
  }

  return res.json({ me: user, endpoint: req.path, ok: true });
};
