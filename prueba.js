// const path = require('node:path');

// console.log(path.sep);


// //Leer un directorio -ls 

// const fs=require('node:fs/promises');

// //si un archivo existe o no existe
// //fs.stat('content')
// //posición1 es node, posicion2 es el fichero, posicion3 sería la cvarpeta a la que quiero hacer el list
// const folder = process.argv[2] ?? "."


// fs.readdir(folder)
// .then (files =>{
//     files.forEach(file => {
//         const filePath = path.join(folder, file)
//         fs.stat(filePath);
//     })
// })

// .catch(err => {
//     if(err){
//         console.error('error al leer el directorio', err) 
//         return;
//     }
// })