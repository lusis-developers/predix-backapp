import { Application } from 'express';
import request from 'supertest';
import mongoose from 'mongoose';

import createApp from '../../../app';
import dbConnect from '../../../config/mongo';
import models from '../../../models/index';

describe('GET api/sport/:id', () => {
  let app: Application;
  let sportId: string;
  let wrongSportId: string;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    app = createApp();
    const createResponse = await request(app)
      .post('/api/sports')
      .send({ name: 'TestSportName', image: 'http://fakeimage.com' });
    sportId = createResponse.body._id;
    wrongSportId = '000dd234234000df';
  });

  afterEach(async () => {
    await request(app).delete(`/api/sports/${sportId}`);
  });

  it('should return a specific sport with the id', async () => {
    const response = await request(app)
      .get(`/api/sports/${sportId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeTruthy();
  });

  it('should return bad request for wrong id', async () => {
    const response = await request(app)
      .get(`/api/sports/${wrongSportId}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  afterAll(async () => {
    if (sportId) {
      await models.sports.findOneAndDelete({ sportId });
    }
    await mongoose.disconnect();
  });
});
