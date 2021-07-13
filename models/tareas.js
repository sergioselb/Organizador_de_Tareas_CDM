const Tarea = require("./tarea");

class Tareas {
  _listado = {}; //propiedad listado, como para entender mejor de donde viene pero no hace falta, en js las propiedades de una clase se definen en su contructor directamente.

  get listadoArr() {
    // se usa un getter para retornar un nuevo arreglo con las tareas.

    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      // funcion que llena el arreglo, mas o +/- comun. esta funcion los que nos permite es extraer todas las llaves que trae nuestro objeto, en este caso de _listado, las extraigo y esto crea un arreglo de string, barro o recorro con el forEach cada una de esas llaves.
      const tarea = this._listado[key]; // se extrae la tarea que ya esta instanciada en esta llave.
      listado.push(tarea); // la agrego al arreglo como una nueva tarea
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc); // se crea una nueva instancia de tarea, y su desc que se recibe como arg(opcional)

    this._listado[tarea.id] = tarea; // se hace referecia a propiedad del objeto[tarea.id] tamb se podria .id sin []
  }

  listadoCompleto() {
    // metodo para listar la informacion que el usuario deberia ver solamente.
    console.log();

    this.listadoArr.forEach((tarea, i) => {
      const indice = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;

      console.log(`${indice} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;

    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      if (completadas) {
        // mostrar completadas
        if (completadoEn) {
          contador += 1;
          console.log(
            `${contador.toString().green}${".".green} ${desc} :: ${
              completadoEn.green
            }`
          );
        }
      } else {
        // mostrar Pendientes
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toLocaleString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
