import homeRoutes from "./homeRoute.js";
import generoRoutes from "./generosRoute.js";
import seriesRoutes from "./seriesRoute.js";
import detailsRoutes from "./detailsRoute.js";

const router = {
  home: homeRoutes,
  genero: generoRoutes,
  series: seriesRoutes,
  details: detailsRoutes,
};

export default router;
