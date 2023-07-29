import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnect from './config/mongo';
import planRoutes from './routes/plan';

// Carga las variables de entorno desde .env
dotenv.config();  

const app = express();

// Uso de middleware
app.use(cors());
app.use(express.json())

// Inicio de la conexión con la base de datos
dbConnect();

const port: number = Number(process.env.PORT);

/**
 * Aqui invocamos a las rutas
 */
app.use('/api', planRoutes);

// Inicio del servidor
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)})



// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const dbConnect = require('./config/mongo');

// dotenv.config();

// const whiteList = [
//   'http://localhost:5173',
//   // TODO: add app app domain
//   // TODO: add app sandbox domain
// ];

// const app = express();

// app.use(cors({ origin: whiteList }));

// app.use(express.json());

// const port = process.env.PORT;

// app.get('/', (req, res) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

// dbConnect();