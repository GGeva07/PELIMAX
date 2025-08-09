import usuarioModel from "../models/usuarioModel.js";
import bcrypt from "bcryptjs";

const loginController = {
  showLogin: (req, res) => {
    res.render("login/login", { error: null });
  },
  showRegister: (req, res) => {
    res.render("login/register");
  },
  register: (req, res) => {
    const { email, password } = req.body;
    if (usuarioModel.findByEmail(email)) {
      return res.render("login/register", {
        error: "El email ya está registrado.",
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    usuarioModel.create({ email, password: hash });
    res.redirect("/login");
  },
  login: (req, res) => {
    const { email, password } = req.body;
    let errorMsg = null;
    if (!email || email.length > 50) {
      errorMsg = "error";
    } else {
      const usuario = usuarioModel.findByEmail(email);
      if (
        !usuario ||
        !usuarioModel.comparePassword(password, usuario.password)
      ) {
        errorMsg = "Credenciales incorrectas";
      }
    }
    if (errorMsg) {
      return res.render("login/login", { error: errorMsg });
    }
    const usuario = usuarioModel.findByEmail(email);
    req.session.usuario = usuario;
    res.redirect("/home");
  },
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  },
};

export default loginController;
