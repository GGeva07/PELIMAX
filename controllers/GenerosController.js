import Genero from "../models/generoModel.js";

export function GetIndex(req, res, next) {
  Genero.GetAll((generos) => {
    res.render("generos/index", {
      "page-title": "Inicio",
      hasGeneros: generos.length > 0,
      ListadeGeneros: generos,
    });
  });
}

export function CreateGenre(req, res, next) {
  res.render("generos/create", {
    isEditing: false,
    "page-title": "Crear Genero",
  });
}

export function PostGenre(req, res, next) {
  const { nombreGenero } = req.body;
  const newGenre = new Genero(0, nombreGenero);
  newGenre.Save();
  res.redirect("/generos/index");
}

export function DeleteGenre(req, res, next) {
  const { GeneroId } = req.body;
  Genero.Delete(GeneroId);
  res.redirect("/generos/index");
}

export function EditGenre(req, res, next) {
  const { GeneroId } = req.params;

  Genero.GetById(GeneroId, (genero) => {
    res.render("generos/create", {
      isEditing: true,
      "page-title": "Editar Genero",
      genero: genero,
    });
  });
}

export function postEditGenre(req, res, next) {
  const { nombreGenero, GeneroId } = req.body;

  Genero.Update(GeneroId, nombreGenero);

  res.redirect("/generos/index");
}
