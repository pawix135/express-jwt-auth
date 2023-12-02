import Express from "express";
import authRoute from "@/routes/auth/auth_route";

const router = Express.Router();

router.use("/auth", authRoute);

export default router;
