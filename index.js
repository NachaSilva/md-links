const fs = require("node:fs");
const path = require("node:path");
const getFilesFromPath = require("./functions");
const extractLinks = require(".functions");
const validateLinks = require(".functions");

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const files = getFilesFromPath(path);
    const links = files.reduce((acc, file) => {
      const fileContent = fs.readFileSync(file, "utf8");
      const fileLinks = extractLinks(fileContent, file);
      return acc.concat(fileLinks);
    }, []);

    if (options.validate) {
      validateLinks(links).then(resolve).catch(reject);
    } else {
      resolve(links);
    }
  });
}

//Obtener los argumentos de la linea de comandos
const args = process.argv.slice(2);
const path = args[0];
const validate = args.includes(--validate);

if(path){
    mdLinks(path, {validate})
    .then(links => {
        console.log(links);
    })
    .catch(console.error);
} else{
    console.error('Recuerda! Debes especificar la ruta o directorio')
}

module.exports = mdLinks;




// // Leer un archivo con ruta fija
// const rutaArchivo = "testOne.md";

// fs.readFile(rutaArchivo, "utf8", (error, data) => {
//   if (error) {
//     console.error("Error al leer el archivo:", error);
//   } else {
//     console.log("Contenido del archivo:", data);
//   }
// });

// // Extensión de una archivo


// const nombreArchivo = "testOne.md"; //

// const extension = path.extname(nombreArchivo);

// console.log("Extensión del archivo:", extension);

// // Unir 2 rutas:

// const ruta1 = "/home/Laboratoria/";
// const ruta2 = "./test";

// const rutaUnida = path.join(ruta1, ruta2);

// console.log("Ruta unida:", rutaUnida);

// // function pathExists(filePath) {
// //     return new Promise((resolve) => {
// //       fs.access(filePath, fs.constants.F_OK, (err) => {
// //         if (err) {
// //           resolve(false);
// //         } else {
// //           resolve(true);
// //         }
// //       });
// //     });
// //   }
// //   module.exports = pathExists;
// // module.exports = () => {
// //   // ...
// // };

// // export const mdLinks= (path, options) => {

// // }
// // const sum = require('./sum');

// // //common .js
// // console.log(sum(1,2));
