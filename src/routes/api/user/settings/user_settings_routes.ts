import { POST_CHANGE_EMAIL } from "@/controllers/api/user/settings/user_settings_controller";
import Express from "express";

const router = Express.Router();

// POST ROUTES
router.post("/email", POST_CHANGE_EMAIL);

export default router;
