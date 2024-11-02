import express from "express";
const router = express.Router();
import { testUser } from "../../controllers/User.Controller.js";

router.get("/", testUser);

export default router;
