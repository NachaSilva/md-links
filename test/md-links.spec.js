// const mdLinks = require('../');
const mdlinks = require("../index");
const functions = require("../functions");
const path = require("path");

// const path2 = require("../test/some/example.md");
const mdLinks = require("../index");

const preFixPath = path.resolve('../.');
console.log(preFixPath);

const mock = {
  get: jest.fn(),
};

describe("mdLinks", () => {
  it("Verificar si es una función", () => {
    expect(typeof mdlinks).toBe("function");
  });

  it("Retornar error si el path es inválido o vacío", async () => {
    try {
      await mdLinks("", { validate: false });
    } catch (error) {
      //expect(error).toBeDefined(); // Espera que se genere un error
      expect(error.message).toContain("mdLinks is not defined");
    }
  });
  it("Recorre el array de archivos .md del directorio de forma recursiva", async () => {
    const result = await mdLinks("./test/some", { validate: false });

    expect(result).toEqual([
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
        text: "Array.prototype.filter()",
        userPath:
          preFixPath + "\\md-links\\test\\some\\directory\\exampleOne.md",
      },
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
        text: "Array.prototype.map()",
        userPath:
        preFixPath + "\\md-links\\test\\some\\example.md",
      },
    ]);
  });

  // it('Retornar href, text y file si validate es false' , async()=>{
  //   //ruta de archivo de ejemplo
  //   const mdFilePath = './test/some/example.md';
  //   const resultArray = await mdLinks(mdFilePath, {validate: false});

  //   expect(resultArray).toEqual([
  //     {href:'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays', text: 'Arreglos', }
  //   ])
  // })
});

//Si falla

//Si tiene como option true

//Si tiene como option false

//Funciones puras: getAbsolutePath(userPath), fileCheck(userPath), fs.statSync, getMdExtensionFile(userPath), path.extname, readDirectory(userPath),
//fs.readdirSync
