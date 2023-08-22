#!/usr/bin/env node
const mdLinks = require("./index.js");

const args = process.argv.slice(2);
const path = args[0];

const options = {
  validate: args.includes("--validate"),
  stats: args.includes("--stats"), // Use "--stats" instead of "stats"
};

mdLinks(path, options)
  .then((result) => {
    if (options.stats) {
    if(options.validate){
    const totalLinks = result.length;
    const uniqueLinks = new Set(result.map((link)=> link.href)).size;
    const brokenLinks = result.filter((link)=> !link.ok).length;
    console.log(`Total: ${totalLinks}`);
    console.log(`Unique: ${uniqueLinks}`);
    console.log(`Broken: ${brokenLinks}`);
    }else{
      const totalLinks = result.length;
      const uniqueLinks = new Set(result.map((link) => link.href)).size;
      console.log(`Total: ${totalLinks}`);
      console.log(`Unique: ${uniqueLinks}`);
    }
 } else {
      result.forEach((link) => {
        if (options.validate) {
          console.log(
            `${path} ${link.href} ${link.ok ? "ok" : "fail"} ${link.status} ${link.text}`
          );
        } else {
          console.log(`${path} ${link.href} ${link.text}`);
        }
      });
    }
  })
  .catch((error) => {
    console.log("Error", error.message);
  });

// .then((links) => {
//     links.forEach((link) => {
//       if (options.validate) {
//         console.log(
//           `${path} ${link.href} ${link.ok ? "ok" : "fail"} ${link.status} ${link.text}`
//         );
//       } else {
//         console.log(`${path} ${link.href} ${link.text}`);
//       }
//     });
//   })
//   .catch((error) => {
//     console.log("Error", error.message);
//   });
