import {
  POST_CHANGE_EMAIL,
  POST_CHANGE_PASSWORD,
  POST_CHANGE_SELECTED_SETTINGS,
  POST_CHANGE_USERNAME,
} from "@/controllers/api/user/settings/user_settings_controller";
import Express from "express";

const router = Express.Router();

// POST ROUTES
router.post("/", POST_CHANGE_SELECTED_SETTINGS);
router.post("/email", POST_CHANGE_EMAIL);
router.post("/username", POST_CHANGE_USERNAME);
router.post("/password", POST_CHANGE_PASSWORD);

export default router;
