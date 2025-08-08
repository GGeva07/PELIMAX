import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import path from "path";

//imports propios
import { RutaProyecto } from "./utils/path.js";

//rutas de paginas
import router from "./routes/indexRoutes.js";
import loginRoutes from "./routes/loginRoute.js";

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

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(RutaProyecto, "public")));

// sesiones
app.use(
  session({
    secret: "pelimax_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware para proteger rutas (excepto login y register)
function requireAuth(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  }
  return res.redirect("/login");
}

// Redirigir raíz a login si no hay sesión
app.get("/", (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect("/login");
  }
  next();
});

// rutas de autenticación
app.use(loginRoutes);

// Proteger rutas principales
app.use("/home", requireAuth, router.home);
app.use("/generos", requireAuth, router.genero);
app.use("/series", requireAuth, router.series);
app.use("/details", requireAuth, router.details);

//404
app.use((req, res, next) => {
  res.status(404).render("404", { "page.title": "Not found" });
});

//port
app.listen(3000);
