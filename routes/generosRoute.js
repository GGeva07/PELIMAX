import express from "express";
import {
  GetIndex,
  CreateGenre,
  PostGenre,
  DeleteGenre,
  EditGenre,
  postEditGenre,
} from "../controllers/GenerosController.js";

const router = express.Router();

//Home Route
router.get("/generos/index", GetIndex);

router.get("/generos/create", CreateGenre);

router.post("/generos/create", PostGenre);

router.post("/generos/delete", DeleteGenre);

router.get("/generos/edit/:GeneroId", EditGenre);

router.post("/generos/edit", postEditGenre);

export default router;
