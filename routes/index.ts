import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Lee todos los archivos en el directorio actual
fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts')  // Filtra solo los archivos .ts (excluyendo index.ts)
  .forEach((file) => {
    const route = require(path.join(__dirname, file));  // Importa el archivo de ruta
    router.use(`/${file.slice(0, -3)}`, route);  // Usa las rutas en la aplicación Express (elimina la extensión .ts del nombre del archivo para el nombre de la ruta)
  });

export default router;
