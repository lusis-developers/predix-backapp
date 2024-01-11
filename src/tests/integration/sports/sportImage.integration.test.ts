import { Application } from 'express';
import request from 'supertest';
import mongoose from 'mongoose';

import * as fs from 'fs';
import * as path from 'path';

import createApp from '../../../app';
import dbConnect from '../../../config/mongo';
import downloadImage from '../../../utils/imageDownload';

describe('POST /sportImage', () => {
  let app: Application;
  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(() => {
    app = createApp();
  });

  it('should upload an image and return the uploaded image data', async () => {
    const lightImageUrl =
      'https://www.learningcontainer.com/wp-content/uploads/2020/07/Sample-JPEG-Image-File-Download-scaled.jpg';
    const filePath = path.resolve(__dirname, '../../../tmp/tempImage.jpg');
    try {
      await downloadImage(lightImageUrl, filePath);
      const response = await request(app)
        .post('/api/sportImage')
        .attach('sportImage', filePath)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('url');
    } finally {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error al eliminar la imagen temporal: ${err}`);
          return;
        }
      });
    }
  }, 20000);

  it('should not upload for too large Image', async () => {
    const heavyImageUrl =
      'https://www.learningcontainer.com/wp-content/uploads/2020/07/Large-Sample-Image-download-for-Testing.jpg';
    const filePath = path.resolve(__dirname, '../../../tmp/tempImage.jpg');
    try {
      await downloadImage(heavyImageUrl, filePath);
      await request(app)
        .post('/api/sportImage')
        .attach('sportImage', filePath)
        .expect(413);
    } finally {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error al eliminar la imagen temporal: ${err}`);
          return;
        }
      });
    }
  }, 20000);

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
