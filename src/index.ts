import * as dotenv from 'dotenv';

import dbConnect from '../src/config/mongo';
import createApp from '../src/app';
import portConfig from './config/ports';

async function main() {
  dotenv.config();

  await dbConnect();

  const app = createApp();

  const port: number | string =
    process.env.NODE_ENV && portConfig[process.env.NODE_ENV]
      ? portConfig[process.env.NODE_ENV].port
      : 3000;

  app.get('/', (_req, res) => {
    res.send('Predix is online');
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

main();
