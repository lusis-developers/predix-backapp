import express from 'express';
import cors from 'cors';

import routerApi from './routes';
import { errorHandler } from './utils/handleErrors';

// import { sendMassiveVerificationEmail } from './scripts/EmailVerification';

function createApp() {
  const app = express();

  const whiteList = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://predix.ec',
    'https://sandbox-predix.netlify.app'
  ];

  app.use(cors({ origin: whiteList }));

  app.use(express.json());

  // sendMassiveVerificationEmail();

  app.get('/', (_req, res) => {
    res.send('Predix is online');
  });

  routerApi(app);

  app.use(errorHandler);

  return app;
}
export default createApp;
