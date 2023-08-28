const functions = require("./functions.js");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject)=>{
    const mdFiles = functions.getMdFile(path);
    const links = functions.getMdLinks(mdFiles);

    if(options && options.validate){
      functions.getValidateMdLinks(links)
      .then((validatedLinks) => {
        resolve(validatedLinks);
      })
      .catch((error) => {
        reject(error);
      })
    }else{
      resolve(links);
    }
  })
};
//./test/some/example.md"

//  mdLinks("./test/some/example.md", { validate: true })
//   .then((links) => {
//     console.log("Enlaces encontrados en :", links);
//   })
//   .catch((error) => {
//     console.error("Error:", error.message);
//   });

  module.exports = require(mdLinks);