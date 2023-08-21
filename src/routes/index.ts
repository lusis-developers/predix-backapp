import express, { Application } from 'express';
import Plans from './plans';

function routerApi(app: Application) {
  const router = express.Router();
  app.use('/api', router);
  router.use(Plans);
}

export default routerApi;