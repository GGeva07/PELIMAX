import Repository from "../utils/repository.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usuarioFilePath = path.join(__dirname, "../data/usuario.json");
const respository = new Repository("usuario.json");

const usuarioModel = {
  getAll: function () {
    return respository.read(usuarioFilePath) || [];
  },
  findByEmail: function (email) {
    const usuarios = this.getAll();
    return usuarios.find((u) => u.email === email);
  },
  create: function (usuario) {
    const usuarios = this.getAll();
    usuarios.push(usuario);
    respository.write(usuarioFilePath, usuarios);
    return usuario;
  },
  comparePassword: function (plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
  },
};

export default usuarioModel;
