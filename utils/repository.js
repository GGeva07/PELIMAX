import path from "path";

//imports propios
import FileContext from "./File.js";
import { RutaProyecto } from "./path.js";

class Respository {
  constructor(NombreArchivo) {
    this.dataPath = path.join(RutaProyecto, "data", NombreArchivo);
    this.fileCrud = new FileContext(this.dataPath);
  }

  Save(data) {
    this.fileCrud.getAllDataFromFile(this.dataPath, (Lista) => {
      data.id = Math.random() * 1000;
      Lista.push(data);
      this.fileCrud.saveDataInFile(this.dataPath, Lista);
    });
  }

  GetAll(callback) {
    this.fileCrud.getAllDataFromFile(this.dataPath, callback);
  }

  Delete(id) {
    this.fileCrud.getAllDataFromFile(this.dataPath, (Lista) => {
      const listaEditada = Lista.filter((Generos) => Generos.id !== Number(id));

      if (listaEditada.length === Lista.length) {
        console.log("El dato a eliminar no existe");
        return;
      }
      this.fileCrud.saveDataInFile(this.dataPath, listaEditada);
    });
  }

  GetById(id, callback) {
    this.fileCrud.getAllDataFromFile(this.dataPath, (Lista) => {
      const resultado = Lista.find((g) => g.id === Number(id));

      if (resultado) {
        callback(resultado);
      } else {
        console.log("Data no encontrada");
        callback(null);
      }
    });
  }

  Update(id, data) {
    console.log(data);

    this.fileCrud.getAllDataFromFile(this.dataPath, (Lista) => {
      const index = Lista.findIndex((g) => g.id === Number(id));

      if (index === -1) {
        console.log("Data no encontrada para actualizar");
        return;
      }
      if (data.length >= 1) {
        Lista[index].name = data;
      } else {
        Lista[index] = {
          id: Number(id),
          portada: data.portada,
          titulo: data.titulo,
          enlace: data.enlace,
          genero: data.genero,
        };
      }
      this.fileCrud.saveDataInFile(this.dataPath, Lista);
      console.log("Data actualizada correctamente");
    });
  }

  GetByGenre(genre, callback) {
    this.fileCrud.getAllDataFromFile(this.dataPath, (Lista) => {
      const resultado = Lista.filter((g) => g.genero === genre);
      callback(resultado);
    });
  }

  GetByTitle(title, callback) {
    this.fileCrud.getAllDataFromFile(this.dataPath, (Lista) => {
      const resultado = Lista.filter((g) =>
        g.titulo.toLowerCase().includes(title.toLowerCase())
      );
      callback(resultado);
    });
  }
}

export default Respository;
