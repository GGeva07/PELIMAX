import Series from "../models/seriesModel.js";
import Genero from "../models/generoModel.js";

export function GetIndex(req, res, next) {
  Series.GetAll((series) => {
    res.render("series/index", {
      "page-title": "Series",
      hasSeries: series.length > 0,
      ListadeSeries: series,
    });
  });
}

export function CreateSerie(req, res, next) {
  Genero.GetAll((generos) => {
    res.render("series/create", {
      "page-title": "Crear serie",
      hasGeneros: generos.length > 0,
      ListadeGeneros: generos,
    });
  });
}

export function PostSerie(req, res, next) {
  const { ImagenSerie, NombreSerie, linkSerie, GeneroSerie } = req.body;

  if (!ImagenSerie || !NombreSerie || !linkSerie || !GeneroSerie) {
    console.error("Faltan datos requeridos para crear la serie");
    return res.status(400).send("Faltan datos requeridos para crear la serie");
  }

  const newSerie = new Series(ImagenSerie, NombreSerie, linkSerie, GeneroSerie);
  newSerie.Save();

  res.redirect("/series/index");
}

export function DeleteSerie(req, res, next) {
  const { SerieId } = req.body;
  Series.Delete(SerieId);

  res.redirect("/series/index");
}

export function EditSeries(req, res, next) {
  const { SeriesId } = req.params;

  Series.GetById(SeriesId, (serie) => {
    Genero.GetAll((generos) => {
      res.render("series/create", {
        isEditing: true,
        "page-title": "Editar Serie",
        Series: serie,
        hasGeneros: generos.length > 0,
        ListadeGeneros: generos,
      });
    });
  });
}
export function postEditSerie(req, res, next) {
  const serie = req.body;

  const serieEditada = {
    id: serie.Id,
    portada: serie.ImagenSerie,
    titulo: serie.NombreSerie,
    enlace: serie.linkSerie,
    genero: serie.GeneroSerie,
  };

  Series.Update(serieEditada.id, serieEditada);
  res.redirect("/series/index");
}
