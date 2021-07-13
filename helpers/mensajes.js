//const { resolve } = require("path");

require("colors");

const mostrarMenu = () => {

  return new Promise( resolve => {

    
    console.clear();
    console.log("==========================".green);
    console.log("|  Selecione una opción  |".green);
    console.log("==========================\n".green);
  
    console.log(` ${"1.".green} Crear tarea`);
    console.log(` ${"2.".green} Listar tarea`);
    console.log(` ${"3.".green} Listar tarea completadas`);
    console.log(` ${"4.".green} Listar tarea pendientes`);
    console.log(` ${"5.".green} Completar tarea(s)`);
    console.log(` ${"6.".green} Borrar tarea`);
    console.log(` ${"0.".green} Salir \n`);
  
    // recibir informacion del usuario: preparando la interfase
    const readline = require("readline").createInterface({ // readline es un paquete integrado de node
        input: process.stdin,
        output: process.stdout
    });
  
    readline.question("Seleccione una opción:", (opt) => {
      console.log( opt );
      readline.close();
      resolve(opt);
    });

  });

};

    const pausa = () => {

      return new Promise( resolve => {

        const readline = require("readline").createInterface({
          input: process.stdin,
          output: process.stdout
      });
  
      readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
        readline.close();
        resolve();
      })
    });
  }

module.exports = { // se suele exportar como un objeto, ya que quizas tenga muchas funciones dentro.
  mostrarMenu,
  pausa
}