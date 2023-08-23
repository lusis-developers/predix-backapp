import express, { Application } from 'express';
import Plans from './plans';
import Sports from './sports';
import Leagues from './leagues';


function routerApi(app: Application) {
  const router = express.Router();
  app.use('/api', router);
  {
    router.use(Plans),
    router.use(Sports),
    router.use(Leagues)
  }
}

export default routerApi;