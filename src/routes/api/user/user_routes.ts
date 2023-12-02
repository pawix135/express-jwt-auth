import { userController } from "@/controllers/api/user/user_controller";
import userSettingsRoutes from "./settings/user_settings_routes";
import Express from "express";

const router = Express.Router();

// GET ROUTES
router.get("/me", userController.GET_ME);

// User settings routes
router.use("/settings", userSettingsRoutes);

export default router;
