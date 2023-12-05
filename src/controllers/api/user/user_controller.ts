import { APIControler } from "@/@types/API";
import { UserMeResponse } from "@/@types/API/User";
import { prisma } from "@/db/prisma";
import { exclude } from "@/utils/db";
import { errorResponse } from "@/utils/response";

export const GET_ME: APIControler<UserMeResponse> = async (req, res) => {
  try {
    let user = await prisma.user.findFirst({ where: { id: req.context.id } });

    if (!user) throw new Error("User not found");

    return res.json({ ok: true, me: exclude(user, ["hash"]) });
  } catch (error) {
    return errorResponse<UserMeResponse>(res, { ok: false }, error);
  }
};
