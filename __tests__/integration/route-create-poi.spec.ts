import MongoMock from '../utils/MongoMock';
import request from 'supertest';

import app from '../../src/app';
import PointOfInterest from '../../src/schemas/PointOfInterest';

describe('Route to Create Point of Interest', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await PointOfInterest.deleteMany({});
  });

  it('should return status created', async () => {
    const poi = {
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: 0
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi);

    expect(response.status).toBe(201);
  });

  it('should return status bad request', async () => {
    const poi = {
      name: 'Lanchonete',
      coordinateX: 27
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi);

    expect(response.status).toBe(400);
  });

  it('should accept the number zero', async () => {
    const poi = {
      name: 'Lanchonete',
      coordinateX: 0,
      coordinateY: 0
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi);

    expect(response.status).toBe(201);
  });
});
