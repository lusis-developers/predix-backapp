import { Application } from 'express';
import request from 'supertest';
import mongoose from 'mongoose';

import createApp from '../../../app';
import dbConnect from '../../../config/mongo';

describe('GET api/sports', () => {
  let app: Application;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(() => {
    app = createApp();
  });

  it('should return a list of sports with expected structure', async () => {
    const response = await request(app)
      .get('/api/sports')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeTruthy();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
