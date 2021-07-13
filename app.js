require("colors"); // Usualmente se suelen importar  1ero los paquetes de 3eros

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";

  const tareas = new Tareas(); // se crea una instancias de tareas

  const tareasDB = leerDB();

  if (tareasDB) {
    // cargar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // esta opcion imprime el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // crear opcion
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        //console.log(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3": // listar completadas.
        tareas.listarPendientesCompletadas(true);
        break;

      case "4": // listar pendientes.
        tareas.listarPendientesCompletadas(false);
        break;

      case "5": // completado | pendiente.
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6": // Borrar.
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== 0) {
          const ok = await confirmar("Estas seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
