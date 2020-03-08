import MongoMock from '../utils/MongoMock';
import request from 'supertest';

import app from '../../src/app';
import InterestPoint from '../../src/schemas/InterestPoint';

describe('Interest Point Listing Route', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });
  
  afterAll(async () => {
    await MongoMock.disconnect();
  });
  
  beforeEach(async () => {
    await InterestPoint.deleteMany({});
  });
  
  it('should return status ok', async () => {
    const response = await request(app)
      .get('/interestPoints');

    expect(response.status).toBe(200);
  });
});
