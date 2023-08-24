import { Storage } from '@google-cloud/storage';
import { format } from 'url';

import handleHttpError from '../utils/handleErrors';
import { ImageFile } from '../types/File';

const GCP_PATH = process.env.GCP_PATH;

const storage = new Storage({
  keyFilename: GCP_PATH
});

const bucketName = 'predix';
const bucket = storage.bucket(bucketName);

async function gcpImageUpload(
  file: ImageFile,
  location?: string
): Promise<string> {
  try {
    const ext = file.originalname.split('.').pop();
    const string = file.originalname.split('.').shift();
    const name = string?.replace(/\s/g, '_');
    const filename = `file-${Date.now()}-${name}.${ext}`;

    const blob = bucket.file(location + filename);
    const blobStream = blob.createWriteStream();

    //Capturing error
    blobStream.on('error', (error: any) => {
      handleHttpError(error, 'Cannot upload image');
      return 'Cannot upload image';
    });

    return new Promise<string>((resolve, reject) => {
      blobStream.on('finish', async () => {
        try {
          const publicUrl = format(
            `https://storage.googleapis.com/predix/${blob}`
          );
          resolve(publicUrl);
        } catch (error) {
          reject('Cannot upload image');
        }
      });

      blobStream.end(file.buffer);
    });
  } catch (error: any) {
    handleHttpError(error, 'Cannot upload image');
    return 'Cannot upload image';
  }
}

export default gcpImageUpload;
