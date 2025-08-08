import express from "express";
import loginController from "../controllers/loginController.js";
const router = express.Router();

router.get("/login", loginController.showLogin);
router.get("/register", loginController.showRegister);
router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.get("/logout", loginController.logout);

export default router;
