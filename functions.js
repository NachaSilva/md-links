const functions = {};
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const mdLinksPromise = [];

// Busqueda recursiva de archivos .md dentro de un directorio, subdirectorios. Devuelve lista de rutas absolutas
const getMdFile = (userPath) => {

  let arrayPathFilesMd = [];

  const userPathAbsolute = getAbsolutePath(userPath);

  if (fileCheck(userPathAbsolute)) {
    //Si es archivo
    if (getMdExtensionFile(userPathAbsolute)) {
      arrayPathFilesMd.push(userPathAbsolute);
    }
  } else {
    // Si es directorio
    readDirectory(userPathAbsolute).forEach((file) => {
      const onlyFile = path.join(userPathAbsolute, file);
      const allFile = getMdFile(onlyFile);
      arrayPathFilesMd = arrayPathFilesMd.concat(allFile);
    });
  }
  return arrayPathFilesMd;
};

  // Convertir a ruta absoluta
  const getAbsolutePath = (userPath) => path.resolve(userPath);

  // Verificar si el file es valor booleano
  const fileCheck = (userPath) => fs.statSync(userPath).isFile();

  // Que la extensión sea .md
  const getMdExtensionFile = (userPath) => path.extname(userPath) === ".md";

  //Leer el directorio
  const readDirectory = (userPath) => fs.readdirSync(userPath);

// Función para extraer los links
const getMdLinks = (userPath) =>
  new Promise((resolve, reject) => {
    // Leer los archivos - files
    fs.readFile(userPath, "utf-8", (err, data) => {
      // Expresion regular(regex) para buscar match con los links.md
      const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
      const hashtag = "#";

      if (err) {
        reject(newError("No se encuentra el archivo"));
      } else if (data.match(regexMdLinks)) {
        const matchMdLinks = data.match(regexMdLinks);

        const arrayMdLinks = matchMdLinks.map((link) => {
          //Convierte los strings en un array y elimina ']('
          const arraySplit = link.split("](");
          // Al 1er texto de cada arr remplazar [ por vacio
          const text = arraySplit[0].replace("[", "");
          // Al 2do texto de cada arr remplazar ) por vacio
          const href = arraySplit[1].replace(")", "");
          return { href, text, userPath };
        });
        // filtrar en el array con # para quitar links internos
        const getURL = arrayMdLinks.filter(
          (text) => !text.href.startsWith(hashtag)
        );
        resolve(getURL);
      } else {
        resolve([]);
      }
    });
  });

// Función para extraer las url .md de cada archivo-file
const getArrayMdLinks = (newArrayMd) => {
  newArrayMd.forEach((file) => mdLinksPromise.push(getMdLinks(file)));
  return mdLinksPromise;
};

//Función para validar los links .md
const getValidateMdLinks = (getLinksUrl) => {
  const arrayValidate = getLinksUrl.map((links) => {
    const link = links;

    //Petición HTTP
    return axios
      .get(link.href)
      .then((resultado) =>
        //Nuevo objeto para adicionar la propiedad status 200 si está ok
        ({ ...link, status: resultado.status, ok: true })
      )
      .catch((err) => {
        //De lo contrario, error 404
        let status = 404;
        if (err.resultado) {
          status = err.resultado.status;
        }
        //Nuevo objeto para adicionar la propiedad status si está false
        return { ...links, status, ok: false };
      });
  });

  return Promise.all(arrayValidate);
};

functions.getArrayMdLinks = getArrayMdLinks;
functions.getMdFile = getMdFile;
functions.getMdLinks = getMdLinks;
functions.getValidateMdLinks = getValidateMdLinks;

module.exports =  functions;