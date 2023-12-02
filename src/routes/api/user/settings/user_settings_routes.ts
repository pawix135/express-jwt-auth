import { userSettingsController } from "@/controllers/api/user/settings/user_settings_controller";
import Express from "express";

const router = Express.Router();

// GET ROUTES
router.get("/", (req, res) => {
  res.json({ ok: true });
});

// POST ROUTES
router.post("/email", userSettingsController.POST_CHANGE_EMAIL);

export default router;
