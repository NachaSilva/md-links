const mdlinks = require("../index");
const functions = require("../functions");
const path = require("path");
const mdLinks = require("../index");

const preFixPath = path.resolve("../.");
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
      expect(error.message).toContain("mdLinks is not defined");
    }
  });
  it("Si validate es true debe retornar un objeto link con sus propiedades: href, text, file, status, ok", async () => {
    const result = await mdLinks("./test/some/example.md", {
      validate: true,
    });

    expect(result).toEqual([
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
        text: "Array.prototype.map()",
        userPath: preFixPath + "\\md-links\\test\\some\\example.md",
        status: 200,
        ok: true,
      },
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce",
        text: "Array.prototype.reduce()",
        userPath: preFixPath + "\\md-links\\test\\some\\example.md",
        status: 200,
        ok: true,
      },
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce",
        text: "A - MDN",
        userPath: preFixPath + "\\md-links\\test\\some\\example.md",
        status: 200,
        ok: true,
      },
      {
        href: "curriculum.laboratoria.a/e/topics/javascript/04-arrays",
        text: "Arreglos",
        userPath: preFixPath + "\\md-links\\test\\some\\example.md",
        status: 404,
        ok: false,
      },
    ]);
  });
  it("Si validate es false debe retornar un objeto link con sus propiedades: href, text, file", async () => {
    const result = await mdLinks("./test/some/example.md", {
      validate: false,
    });
    expect(result).toEqual([
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
        text: "Array.prototype.map()",
        userPath: preFixPath + "\\md-links\\test\\some\\example.md",
      },
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce",
        text: "Array.prototype.reduce()",
        userPath: preFixPath + "\\md-links\\test\\some\\example.md",
      },
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce",
        text: "A - MDN",
        userPath: preFixPath + "\\md-links\\test\\some\\example.md",
      },
      {
        href: "curriculum.laboratoria.a/e/topics/javascript/04-arrays",
        text: "Arreglos",
        userPath: preFixPath + "\\md-links\\test\\some\\example.md",
      },
    ]);
  });
});

describe("funciones claves", () => {
  it("Verificar que getMdFiles busque y recopile de manera recursiva todos los archivos con extensión .md", async() => {
    const result = await functions.getMdFile("./test/some");

    expect(result).toEqual([
      preFixPath + "\\md-links\\test\\some\\directory\\exampleOne.md",
      preFixPath + "\\md-links\\test\\some\\example.md"
    ])
  });
  it("Verificar que getMdLinks extrae los enlaces de archivos con extensión .md", () => {
    const result = functions.getMdLinks([preFixPath + "\\md-links\\test\\some\\directory\\exampleOne.md"]);

    expect(result).toEqual([
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
        text: "Array.prototype.filter()",
        userPath: preFixPath + "\\md-links\\test\\some\\directory\\exampleOne.md",
      }
    ])
  })
})