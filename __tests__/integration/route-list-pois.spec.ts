import request from 'supertest';

import MongoMock from '../utils/MongoMock';
import getTokenMock from '../utils/auth-mock';
import poisArrayMock from '../utils/arrays-mock';
import app from '../../src/app';

import POI from '../../src/schemas/PointOfInterest';

describe('Route to List Points of Interest', () => {
  let tokenMock: string

  beforeAll(async () => {
    await MongoMock.connect();
    tokenMock = getTokenMock()
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await POI.deleteMany({});
  });

  it('should return status 200 on getting all POIs with a valid authorization token', async () => {
    await POI.create(poisArrayMock);

    const response = await request(app)
      .get('/pointsOfInterest')
      .set('Authorization', `Bearer ${tokenMock}`);

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

  it('should return status 401 on getting all POIs without authorization token', async () => {
    const response = await request(app)
      .get('/pointsOfInterest');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('No token provided');
  });

  it('should return status 401 on getting all POIs with authorization token malformatted', async () => {
    const response = await request(app)
      .get('/pointsOfInterest')
      .set('Authorization', tokenMock);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Token malformatted');
  });

  it('should return status 401 on getting all POIs with invalid authorization token', async () => {
    const response = await request(app)
      .get('/pointsOfInterest')
      .set('Authorization', 'Bearer test');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Token invalid');
  });
});
