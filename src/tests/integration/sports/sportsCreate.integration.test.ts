import { Application } from 'express';
import request from 'supertest';
import mongoose from 'mongoose';

import createApp from '../../../app';
import dbConnect from '../../../config/mongo';

import models from '../../../models/index';

describe('POST api/sports', () => {
  let app: Application;
  let sportId: string;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(() => {
    app = createApp();
  });

  it('should create sucessfully a sport', async () => {
    const response = await request(app)
      .post('/api/sports')
      .send({ name: 'TestSportName', image: 'http://fakeimage.com' })
      .expect(200);

    sportId = response.body._id;
    expect(response.body).toBeTruthy();
  });

  it('should response invalid request', async () => {
    const response = await request(app)
      .post('/api/sports')
      .send({
        name: 'TestSportName',
        image: 'http://fakebalonmanolimage.com'
      })
      .expect(409);

    expect(response.body.message).toBe('Cannot create sport');
  });

  it('DELETE api/sports/:id', async () => {
    await request(app).delete(`/api/sports/${sportId}`).expect(200);
  });

  it('invalid sport name lenght', async () => {
    const response = await request(app)
      .post('/api/sports')
      .send({
        name: 'ThisTestNameIsTooLongAndIsMoreThan20Lenght',
        image: 'http://fakebalonmanolimage.com'
      })
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  it('invalid sport name string', async () => {
    const response = await request(app)
      .post('/api/sports')
      .send({
        name: 1234,
        image: 'http://fakebalonmanolimage.com'
      })
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  it('invalid empty sport name', async () => {
    const response = await request(app)
      .post('/api/sports')
      .send({
        name: '',
        image: 'http://fakebalonmanolimage.com'
      })
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  it('invalid sport image', async () => {
    const response = await request(app)
      .post('/api/sports')
      .send({
        name: 'TestSportName',
        image: 1234
      })
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  it('invalid empty sport image', async () => {
    const response = await request(app)
      .post('/api/sports')
      .send({
        name: 'TestSportName',
        image: ''
      })
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
