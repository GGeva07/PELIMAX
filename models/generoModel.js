import Respository from "../utils/repository.js";

const respository = new Respository("generos.json");

class Genero {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  Save() {
    respository.Save(this);
  }

  static GetAll(callback) {
    respository.GetAll(callback);
  }

  static Delete(id) {
    respository.Delete(id);
  }

  static GetById(id, callback) {
    respository.GetById(id, callback);
  }

  static Update(id, newName) {
    respository.Update(id, newName);
  }
}

export default Genero;
