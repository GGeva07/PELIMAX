import Series from "../models/seriesModel.js";
import getYouTubeVideoId from "../public/assets/js/site/index.js";

export function GetIndex(req, res, next) {
  const id = req.params.id;
  console.log("LLEGÓ AL CONTROLADOR: ", id);

  Series.GetById(id, (serie) => {
    const videoId = getYouTubeVideoId(serie.enlace);
    res.render("details/index", {
      "page-title": "Ver Serie",
      Series: { ...serie, videoId },
    });
  });
}
