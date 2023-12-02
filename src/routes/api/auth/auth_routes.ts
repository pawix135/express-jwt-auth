import { authController } from "@/controllers/api/auth";
import Express from "express";

const router = Express.Router();

//GET ROUTES
router.get("/", authController.authRoute);

//POST ROUTES
router.post("/signin", authController.POST_SIGN_IN);
router.post("/signup", authController.POST_SIGN_UP);

router.post("/checktoken", authController.POST_CHECK_ACCESS_TOKEN);
router.post("/revoke", authController.POST_REVOKE_ACCESS_TOKEN);

export default router;
