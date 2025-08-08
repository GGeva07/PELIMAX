import express from "express";
import {
  GetIndex,
  CreateSerie,
  PostSerie,
  DeleteSerie,
  EditSeries,
  postEditSerie,
} from "../controllers/SeriesController.js";

const router = express.Router();

//Home Route
router.get("/series/index", GetIndex);

router.get("/series/create", CreateSerie);

router.post("/series/create", PostSerie);

router.post("/series/delete", DeleteSerie);

router.get("/series/edit/:SeriesId", EditSeries);

router.post("/series/edit", postEditSerie);

export default router;
