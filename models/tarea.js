const { v4: uuidv4 } = require("uuid");

class Tarea {
  // las clases son Uppercamelcase (inicial en mayusculas)

  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
  }
}

module.exports = Tarea;
