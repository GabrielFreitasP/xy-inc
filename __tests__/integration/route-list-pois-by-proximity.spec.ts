import request from 'supertest';

import MongoMock from '../utils/MongoMock';
import getTokenMock from '../utils/auth-mock';
import poisArrayMock from '../utils/arrays-mock';
import app from '../../src/app';

import POI from '../../src/schemas/PointOfInterest';

describe('Route to List Points of Interest by Proximity', () => {
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

  it('should return status 200 on getting proximity POIs with a valid query and a valid authorization token', async () => {
    await POI.create(poisArrayMock);

    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=10&coordinateX=20&coordinateY=10')
      .set('Authorization', `Bearer ${tokenMock}`);

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

  it('should return status 400 on getting proximity POIs with any query', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity')      
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('No query content');
  });

  it('should return status 400 on getting proximity POIs with a missing field on query', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=10&coordinateX=20')
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Invalid query content');
  });

  it('should return status 400 on getting proximity POIs with an invalid field on query', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=10&coordinateX=text&coordinateY=10')
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Invalid query content');
  });

  it('should return status 400 on getting proximity POIs with a negative value on query', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=-10&coordinateX=20&coordinateY=10')
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Negative values aren't accepted");
  });

  it('should return status 401 on getting proximity POIs without authorization token', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('No token provided');
  });

  it('should return status 401 on getting proximity POIs with a malformatted authorization token', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity')
      .set('Authorization', tokenMock);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Token malformatted');
  });

  it('should return status 401 on getting proximity POIs with an invalid authorization token', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity')
      .set('Authorization', 'Bearer test');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Token invalid');
  });
});
