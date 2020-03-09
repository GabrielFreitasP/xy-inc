import MongoMock from '../utils/MongoMock';
import request from 'supertest';
import app from '../../src/app';

import POI from '../../src/schemas/PointOfInterest';

import { poisArrayMock } from '../utils/arrays-mock';

describe('Route to List Points of Interest by Proximity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await POI.deleteMany({});
  });

  it('should return status 200 with correct query', async () => {
    await POI.create(poisArrayMock);

    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=10&coordinateX=20&coordinateY=10');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(4);
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining(poisArrayMock[0]),
        expect.objectContaining(poisArrayMock[2]),
        expect.objectContaining(poisArrayMock[4]),
        expect.objectContaining(poisArrayMock[5])
      ])
    );
  });

  it('should return status 400 without query', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity')
      .send();

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('No query content');
  });

  it('should return status 400 missing field on query', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=10&coordinateX=20');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Invalid query content');
  });

  it('should return status 400 invalid field on query', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=10&coordinateX=text&coordinateY=10');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Invalid query content');
  });

  it('should return status 400 with negative value on query', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=-10&coordinateX=20&coordinateY=10');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Negative values aren't accepted");
  });
});
