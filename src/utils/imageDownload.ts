import axios from 'axios';
import fs from 'fs';

async function downloadImage(url: string, filepath: string): Promise<string> {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('finish', () => resolve(filepath))
      .on('error', (e: Error) => reject(e));
  });
}

export default downloadImage;
