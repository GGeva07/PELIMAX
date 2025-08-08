import express from "express";
import { engine } from "express-handlebars";
import path from "path";

//imports propios
import { RutaProyecto } from "./utils/path.js";

//rutas de paginas
import router from "./routes/indexRoutes.js";

const app = express();

//render engine
app.engine(
  "hbs",
  engine({
    layoutsDir: path.join(RutaProyecto, "views", "layouts"),
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(RutaProyecto, "public")));

//routes
app.use(router.home);
app.use(router.genero);
app.use(router.series);
app.use(router.details);

//404
app.use((req, res, next) => {
  res.status(404).render("404", { "page.title": "Not found" });
});

//port
app.listen(3000);
