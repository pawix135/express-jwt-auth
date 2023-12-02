import Express from "express";
import authRoutes from "@/routes/auth/auth_routes";
import userRoutes from "@/routes/user/user_routes";
import { validateUser } from "@/middlewares/validateUser";

const router = Express.Router();

router.use("/auth", authRoutes);
router.use("/user", validateUser, userRoutes);

export default router;
