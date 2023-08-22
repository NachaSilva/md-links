#!/usr/bin/env node
const mdLinks = require("./index.js");

const args = process.argv.slice(2);
const path = args[0];

const options = {
  validate: args.includes("--validate"),
};

mdLinks(path, options)
  .then((links) => {
    links.forEach((link) => {
      if (options.validate) {
        console.log(
          `${path} ${link.href} ${link.ok ? "ok" : "fail"} ${link.status} ${link.text}`
        );
      } else {
        console.log(`${path} ${link.href} ${link.text}`);
      }
    });
  })
  .catch((error) => {
    console.log("Error", error.message);
  });