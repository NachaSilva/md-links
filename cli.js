#!/usr/bin/env node
const mdLinks = require("./index.js");
const pc = require("picocolors");

const args = process.argv.slice(2);
const path = args[0];

const options = {
  validate: args.includes("--validate"),
  stats: args.includes("--stats"), 
  help: args.includes("--help"),
};

if(options.help){
  console.log(`
  ${pc.bgBlue("**************************")}
  ${pc.bgBlue("**")} ${pc.bold("Welcome to MdLinks!!")} ${pc.bgBlue("**")}
  ${pc.bgBlue("**************************")}

  ${pc.bold("Usage:")}
  md-links <path-to-file> [options]

  ${pc.bold("Options:")}
  ${pc.blue("--validate")}: Check if the link works
  ${pc.magenta('--stats')}: Display basic link stadistics 
  ${pc.yellow("--stats --validate")}: Display stadistics that require validation results"

  `)
} else{

mdLinks(path, options)
  .then((result) => {
    if (options.stats) {
    if(options.validate){
    const totalLinks = result.length;
    const uniqueLinks = new Set(result.map((link)=> link.href)).size;
    const brokenLinks = result.filter((link)=> !link.ok).length;
    console.log(`Total: ${pc.green(totalLinks)}`);
    console.log(`Unique: ${pc.blue(uniqueLinks)}`);
    console.log(`Broken: ${pc.red(brokenLinks)}`);
    }else{
      const totalLinks = result.length;
      const uniqueLinks = new Set(result.map((link) => link.href)).size;
      console.log(`Total: ${pc.green(totalLinks)}`);
      console.log(`Unique: ${pc.blue(uniqueLinks)}`);
    }
 } else {
      result.forEach((link) => {
        if (options.validate) {
          console.log(
            `${pc.cyan(path)} ${pc.blue(link.href)} ${link.ok ? pc.bgGreen("ok") : pc.bgRed("fail")} ${pc.yellow(link.status)} ${pc.gray(link.text)}`
          );
        } else {
          console.log(`${pc.cyan(path)} ${pc.blue(link.href)} ${pc.gray(link.text)}`);
        }
      });
    }
  })
  .catch((error) => {
    console.log("Error", error.message);
  });
}
