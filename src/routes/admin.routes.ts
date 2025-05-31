import express from "express";
import { adminLogin } from "../controllers/auth.controller";
import { getAllPolls } from "../controllers/admin.controller";
import { verifyAdmin } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/polls", verifyAdmin, getAllPolls);

export default router;
