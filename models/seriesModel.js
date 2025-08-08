import Respository from "../utils/repository.js";

const repository = new Respository("series.json");

class Series {
  constructor(portada, titulo, enlace, genero) {
    this.id = 0;
    this.portada = portada;
    this.titulo = titulo;
    this.enlace = enlace;
    this.genero = genero;
  }

  Save() {
    repository.Save(this);
  }

  static GetAll(callback) {
    repository.GetAll(callback);
  }

  static Delete(id) {
    repository.Delete(id);
  }

  static GetById(id, callback) {
    repository.GetById(id, callback);
  }

  static Update(id, newName) {
    repository.Update(id, newName);
  }

  static GetByGenre(genre, callback) {
    repository.GetByGenre(genre, callback);
  }

  static GetByTitle(title, callback) {
    repository.GetByTitle(title, callback);
  }
}

export default Series;
