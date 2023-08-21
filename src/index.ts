import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongo';
import { Application } from 'express';

import routeIndex from './routes/index';


dotenv.config();

const whiteList: string[] = [
  'http://localhost:5173',
  // TODO: add app app domain
  // TODO: add app sandbox domain
];

const app: Application = express();

app.use(cors({ origin: whiteList }));

app.use(express.json());

const port: number | string = process.env.PORT || 3000; // Fallback port value, change it to your preferred port

app.use('/api', routeIndex);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

dbConnect();