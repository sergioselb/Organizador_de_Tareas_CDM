const fs = require("fs");

const archivo = "./db/data.json";


const guardarDB = (data) => {

    fs.writeFileSync( archivo, JSON.stringify(data) ); // se convierte la data que es un arreglo, a su version JSON valida como un string. Ademas el JSON.stringify crea un formato json que podemos sustituir en data.txt por data.json
}

const leerDB = () => {

    if ( !fs.existsSync(archivo)) {
      return null;
    }

    const info = fs.readFileSync(archivo, {encoding: "utf-8"});
    const data = JSON.parse( info );

    //console.log(data);

    return data;
}

module.exports = {
  guardarDB,
  leerDB
}