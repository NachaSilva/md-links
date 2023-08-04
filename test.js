const functions = require('./functions.js');

const mdFiles = functions.getMdFile('./some/directory');
console.log('Lista de archivos Markdown encontrados:', mdFiles);

// Prueba 2: Extraer los enlaces de un archivo Markdown
const mdFilePath = './some/example.md';
functions.getMdLinks(mdFilePath)
  .then((links) => {
    console.log('Enlaces encontrados en', mdFilePath, ':', links);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

// Prueba 3: Extraer y validar los enlaces de un archivo Markdown
const mdFilePathToValidate = './some/example.md';
functions.getMdLinks(mdFilePathToValidate)
  .then((links) => functions.getValidateMDLinks(links))
  .then((validatedLinks) => {
    console.log('Enlaces validados en', mdFilePathToValidate, ':', validatedLinks);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });