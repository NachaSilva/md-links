![titulo](./img/titulomdlinks.png)

## Índice

* [1. Introducción](#1-introducción)
* [2. Instalación](#2-instalación)
* [3. ¿Cómo se usa?](#3-cómo-se-usa)
* [4. Ejemplos de uso](#4-ejemplos-de-uso)
* [5. Demo](#5-demo)
* [6. Autora](#6-autora)

***

## 1. Introducción

Markdown es un lenguaje de marcado ligero muy popular en plataformas que manejan texto plano como GitHub, foros, blogs, etc. y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio empezando por el tradicional `README.md`.

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Es por esto que se crea este proyecto, una herramienta de línea de comandos (CLI) junto con una librería que permite buscar y analizar enlaces en archivos con extensión `.md` optimizando la experiencia de trabajo con contenido Markdown.

## 2. Instalación

1. Instala Node.js en tu computador si aún no lo has hecho.
2. Abre tu terminal y navega hasta el proyecto donde deseas utilizar MD-Links.
3. Ejecuta el siguiente comando para instalar la librería:

```sh 
npm install 
```

## 3. ¿Cómo se usa?
  Ya teniendo la librería instalada, puedes usarla proporcionando los datos en la terminal de la siguiente manera:

```sh 
md-links <path-to-file> [options]
```
* path: Ruta absoluta o relativa al archivo o directorio
* options: Para validar o sacar estadísticas ya sea
**--validate**
**--stats**
**--stats --validate**
**--help**

## 4. Ejemplos de uso
Una vez que hayas instalado md-links, puedes utilizarlo de la siguiente manera:


1. Analiza el archivo Markdown e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link.

```sh 
md-links ruta
```
 Ejemplo: 
```sh 
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```
2. Realiza la petición HTTP para verificar la validez de cada enlace. Además de mostrar ok si el link funciona o fail en caso de estar roto, junto con su status de la respuesta recibida. 

```sh 
-- validate
```
Ejemplo:
```sh 
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```
3. Entrega un texto con estadísticas acerca de los enlaces encontrados.
```sh 
--stats
```

Ejemplo: 
```sh 
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

4. Obtener estadísticas que necesiten de los resultados de la validación.

```sh 
--stats --validate
```

Ejemplo:
```sh 
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

5. Acceder a ayuda en consola

```sh 
--help
```

## 5. Demo


## 6. Autora

**Ignacia Silva** *-* *agosto 2023.* 
Si tienes alguna pregunta o sugerencia, no dudes en contactarme [Aquí](https://www.linkedin.com/in/mariaignaciasilva/)

¡Espero que te ayude mucho md-links en tus proyectos!

Happy linking! 📎🌟