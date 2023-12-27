import * as dotenv from 'dotenv';

import dbConnect from './config/mongo';
import createApp from './app';

async function main() {
  await dbConnect();

  dotenv.config();

  const app = createApp();

  const port: number | string = process.env.PORT || 3000; // Fallback port value, change it to your preferred port

  app.get('/', (_req, res) => {
    res.send('Predix is online');
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

main();
