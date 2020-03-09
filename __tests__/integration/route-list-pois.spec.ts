import MongoMock from '../utils/MongoMock';
import request from 'supertest';
import app from '../../src/app';

import POI from '../../src/schemas/PointOfInterest';

import { poisArrayMock } from '../utils/arrays-mock';

describe('Route to List Points of Interest', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await POI.deleteMany({});
  });

  it('should return status 200', async () => {
    await POI.create(poisArrayMock);

    const response = await request(app).get('/pointsOfInterest');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(7);
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining(poisArrayMock[0]),
        expect.objectContaining(poisArrayMock[1]),
        expect.objectContaining(poisArrayMock[2]),
        expect.objectContaining(poisArrayMock[3]),
        expect.objectContaining(poisArrayMock[4]),
        expect.objectContaining(poisArrayMock[5]),
        expect.objectContaining(poisArrayMock[6])
      ])
    );
  });
});
