const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./config/mongo');

dotenv.config();

const whiteList = [
  'http://localhost:5173',
  // TODO: add app app domain
  // TODO: add app sandbox domain
];

const app = express();

app.use(cors({ origin: whiteList }));

app.use(express.json());

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

dbConnect();