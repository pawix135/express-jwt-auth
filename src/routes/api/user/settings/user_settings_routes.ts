import {
  POST_CHANGE_EMAIL,
  POST_CHANGE_PASSWORD,
} from "@/controllers/api/user/settings/user_settings_controller";
import Express from "express";

const router = Express.Router();

// POST ROUTES
router.post("/email", POST_CHANGE_EMAIL);
router.post("/password", POST_CHANGE_PASSWORD);

export default router;
