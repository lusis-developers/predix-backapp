import { Response } from 'express';
import { Storage } from '@google-cloud/storage';
import { format } from 'url';
import * as dotenv from 'dotenv';

import handleHttpError from '../utils/handleErrors';
import { ImagesEnum } from '../enum/imagesEnum';
import { ImageFile } from '../types/File';

dotenv.config();

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY
  }
});

const bucketName = 'predix-images';
const bucket = storage.bucket(bucketName);

async function gcpImageUpload(
  file: ImageFile,
  location?: ImagesEnum
): Promise<string> {
  try {
    const ext = file.originalname.split('.').pop();
    const string = file.originalname.split('.').shift();
    const name = string?.replace(/\s/g, '_');
    const filename = `file-${Date.now()}-${name}.${ext}`;

    const blob = bucket.file(location + filename);
    const blobStream = blob.createWriteStream({
      resumable: false
    });

    const publicUrl: string = await new Promise((resolve, reject) => {
      blobStream
        .on('error', (error: Response) => {
          handleHttpError(
            error,
            'Error uploading file to Google Cloud Storage'
          );
          reject('Error happened on image upload');
        })
        .on('finish', () => {
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${filename}`
          );
          resolve(publicUrl);
        })
        .end(file.buffer);
    });

    return publicUrl;
  } catch (error) {
    return 'Cannot upload image';
  }
}

export default gcpImageUpload;
