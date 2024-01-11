import { Application } from 'express';
import request from 'supertest';
import mongoose from 'mongoose';

import createApp from '../../../app';
import dbConnect from '../../../config/mongo';
import models from '../../../models/index';

describe('UPDATE api/sports/:id', () => {
  let app: Application;
  let sportId: string;
  let invalidSportsId: string;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    app = createApp();
    const createResponse = await request(app)
      .post('/api/sports')
      .send({ name: 'TestSportName', image: 'http://fakeimage.com' });
    sportId = createResponse.body._id;
  });

  afterEach(async () => {
    await request(app).delete(`/api/sports/${sportId}`);
  });

  it('successfully update sport', async () => {
    const response = await request(app)
      .put(`/api/sports/${sportId}`)
      .send({
        name: 'TestSportNameChanged',
        image: 'http://fakeimageChanged.com'
      })
      .expect(200);

    expect(response.body.message).toBe('Sport updated');
  });

  it('Should return invalid Id', async () => {
    invalidSportsId = '0000fc00f000b00ea170';
    await request(app)
      .patch(`/api/sports/${invalidSportsId}`)
      .send({
        name: 'TestSportNameChanged',
        image: 'http://fakeimageChanged.com'
      })
      .expect(404);
  });

  it('invalid sport name lenght', async () => {
    const response = await request(app)
      .put(`/api/sports/${sportId}`)
      .send({
        name: 'ThisTestNameIsTooLongAndIsMoreThan20Lenght',
        image: 'http://fakebalonmanolimage.com'
      })
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  it('invalid sport name string', async () => {
    const response = await request(app)
      .put(`/api/sports/${sportId}`)
      .send({
        name: 1234,
        image: 'http://fakebalonmanolimage.com'
      })
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  it('invalid empty sport name', async () => {
    const response = await request(app)
      .put(`/api/sports/${sportId}`)
      .send({
        name: '',
        image: 'http://fakebalonmanolimage.com'
      })
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  it('invalid sport image', async () => {
    const response = await request(app)
      .put(`/api/sports/${sportId}`)
      .send({
        name: 'TestSportName',
        image: 1234
      })
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  it('invalid empty sport image', async () => {
    const response = await request(app)
      .put(`/api/sports/${sportId}`)
      .send({
        name: 'TestSportName',
        image: ''
      })
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });

  afterAll(async () => {
    if (sportId) {
      await models.sports.findOneAndDelete({ _id: sportId });
    }
    await mongoose.disconnect();
  });
});
