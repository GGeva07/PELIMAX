import express from "express";
import { GetIndex } from "../controllers/detailsController.js";

const router = express.Router();

//Home Route
router.get("/details/index/:id", GetIndex);

export default router;
