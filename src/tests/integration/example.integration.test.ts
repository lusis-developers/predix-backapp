import request from 'supertest';
import express from 'express';
import exampleRoute from '../../routes/example';

const app = express();
app.use(exampleRoute);

describe('Example endpoint test', () => {
  it('Should respond with Predix is online, this is an example', async () => {
    await request(app)
      .get('/example')
      .expect('Content-Type', /text/)
      .expect(200, 'Predix is online, this is an example');
  });
});
