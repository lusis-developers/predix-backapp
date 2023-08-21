import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongo';
import { Application } from 'express';

import routerApi from './routes';

const whiteList: string[] = [
  'http://localhost:5173',
  // TODO: add app app domain
  // TODO: add app sandbox domain
];

const app: Application = express();

app.use(cors({ origin: whiteList }));

app.use(express.json());

dotenv.config();

const port: number | string = process.env.PORT || 3000; // Fallback port value, change it to your preferred port

routerApi(app);

// app.get('/api/ping', (req, res) => {
//   console.log('someone ping')
//   res.send('pong')
// })

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

dbConnect();