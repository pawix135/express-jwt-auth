import {
  POST_REVOKE_ACCESS_TOKEN,
  POST_SIGN_IN,
  POST_SIGN_UP,
} from "@/controllers/api/auth/auth_controller";
import Express from "express";

const router = Express.Router();

//POST ROUTES
router.post("/signin", POST_SIGN_IN);
router.post("/signup", POST_SIGN_UP);
router.post("/revoke", POST_REVOKE_ACCESS_TOKEN);

export default router;
