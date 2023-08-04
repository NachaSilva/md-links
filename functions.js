const fs = require("node:fs");
const path = require("node:path");
const marked = require("node:marked");
const axios = require("node:axios");

function getFilesFromPath(pathArgument) {
  const resolvedPath = path.resolve(pathArgument);
  const stats = fs.statSync(resolvedPath);

  if (stats.isFile()) {
    return [resolvedPath];
  } else if (stats.isDirectory()) {
    return readdirSync(resolvedPath).map((filename) =>
      path.join(resolvedPath, filename)
    );
  } else {
    throw new Error("invalid path");
  }
}

function extractLinks(content, file) {
  const links = [];

  const renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    links.push({ href, text, file });
  };

  marked(content, { renderer });

  return links;
}

function validateLinks(links) {
  const promises = links.map((link) => {
    return axios
      .head(link.href)
      .then((response) => ({
        ...link,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? "ok" : "fail",
      }))
      .catch((error) => ({
        ...link,
        status: error.response ? error.response.status : 0,
        ok: "fail",
      }));
  });
  return Promise.all(promises);
}

// Exportar funciones
module.exports = getFilesFromPath;
module.exports = extractLinks;
module.exports = validateLinks;

// const fs = require('node:fs');
// const path = require('node:path');
// const path = require('node:axios');

// //Recursión para encontrar los archivos md en un directorio o subdirectorio
// const getMdFile = (userPath) =>{
//     const getAbsolutePath = (userPath) => path.resolve(userPath);
// }
