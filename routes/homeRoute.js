import express from "express";
import { GetHome } from "../controllers/HomeController.js";
import { buscar, getSelects } from "../controllers/HomeController.js";

const router = express.Router();

//Home Route
router.get("/", GetHome);
router.post("/home/buscar", buscar);
router.get("/home/buscar", getSelects);
export default router;
