const functions = require("./functions.js");
// module.exports = () => {
//     // ...
//   };

const mdLinks = (path, options) => {
  const mdFiles = functions.getMdFile(path);
    const links = functions.getMdLinks(mdFiles);
    if (options.validate) {
      return links
        .then((link) => functions.getValidateMdLinks(link))
        .then((validatedLinks) => {
          return validatedLinks;
        });
    }
    else {
        return links
    }
  

//array de links



//   // true
//   if (options.validate) {
//     const links = functions
//       .getMdLinks(mdFiles[0])
//       .then((links1) => functions.getValidateMdLinks(links1))
//       .then((validatedLinks) => {
//         return validatedLinks;
//       });
//     return links;
//   }
//   // false
//   else {
//     const links = functions.getMdLinks(mdFiles[0]);
//     return links;
//   }
};

 mdLinks("./some", { validate: true })
  .then((links) => {
    console.log("Enlaces encontrados en :", links);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
