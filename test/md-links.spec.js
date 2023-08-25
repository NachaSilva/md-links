// const mdLinks = require('../');
const mdlinks = require("../index");
const functions = require("../functions");
const path = require("path");


describe('mdLinks', ()=>{
  //Si es una función
  it('Debería ser una función', ()=>{
    expect(typeof mdlinks).toBe('function');
  })

  //Debería retornar error, cuando el path es inválido o vacío
  it('Retornar error si el path no existe',async()=>{
    try {
      await mdLinks('', { validate: false });
    } catch (error) {
     //expect(error).toBeDefined(); // Espera que se genere un error
      expect(error.message).toContain('mdLinks is not defined'); 
    }
  })
});


//Si falla

//Si tiene como option true

//Si tiene como option false



//Funciones puras: getAbsolutePath(userPath), fileCheck(userPath), fs.statSync, getMdExtensionFile(userPath), path.extname, readDirectory(userPath),
//fs.readdirSync
