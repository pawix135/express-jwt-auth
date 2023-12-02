import { userController } from "@/controllers/api/user/user_controller";
import Express from "express";

const router = Express.Router();

//GET ROUTES
router.get("/me", userController.GET_ME);

export default router;
