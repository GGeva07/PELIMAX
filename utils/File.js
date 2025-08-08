import fs from "fs";

export default class FileContext {
  getAllDataFromFile = (dataPath, callback) => {
    fs.readFile(dataPath, function (err, data) {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  };

  saveDataInFile = (dataPath, data) => {
    fs.writeFile(dataPath, JSON.stringify(data), (err) => {
      if (err) {
        console.error("Hubo un error guardando la data", err);
      } else {
        console.log("Data guardada correctamente");
      }
    });
  };
}
