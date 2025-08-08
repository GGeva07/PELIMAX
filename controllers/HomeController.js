import Series from "../models/seriesModel.js";
import Genero from "../models/generoModel.js";

export function GetHome(req, res, next) {
  Genero.GetAll((generos) => {
    Series.GetAll((series) => {
      res.render("home/home", {
        "page-title": "Dominican AnimeFLV",
        hasSeries: series.length > 0,
        hasGeneros: generos.length > 0,
        ListadeSeries: series,
        ListadeGeneros: generos,
      });
    });
  });
}

export function getSelects() {
  Genero.GetAll((generos) => {
    console.log(generos);

    Series.GetAll((series) => {
      console.log(series);
      return res.render("home/buscar", {
        "page-title": "Dominican AnimeFLV",
        hasGeneros: generos.length > 0,
        ListadeGeneros: generos,
      });
    });
  });
}

export function buscar(req, res, next) {
  const { titulo, GeneroSerie } = req.body;
  console.log(GeneroSerie);

  console.log("titulo", titulo);
  Series.GetByTitle(titulo, (series) => {
    return res.render("home/home", {
      "page-title": `Buscar ${titulo}`,
      hasSeries: series.length > 0,
      ListadeSeries: series,
    });
  });

  Series.GetByGenre(GeneroSerie, (series) => {
    return res.render("home/home", {
      "page-title": `Series ${GeneroSerie}`,
      hasSeries: series.length > 0,
      ListadeSeries: series,
    });
  });
}
