import MongoMock from '../utils/MongoMock';
import request from 'supertest';

import app from '../../src/app';
import PointOfInterest from '../../src/schemas/PointOfInterest';

describe('Route to List Points of Interest', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });
  
  afterAll(async () => {
    await MongoMock.disconnect();
  });
  
  beforeEach(async () => {
    await PointOfInterest.deleteMany({});
  });
  
  it('should return status ok', async () => {
    const response = await request(app)
      .get('/pointsOfInterest');

    expect(response.status).toBe(200);
  });
});
