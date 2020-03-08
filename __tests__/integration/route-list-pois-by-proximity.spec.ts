import MongoMock from '../utils/MongoMock';
import request from 'supertest';
import app from '../../src/app';

import POI from '../../src/schemas/PointOfInterest';
import POIData from '../../src/services/structures/PointOfInterestData';

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
  
  it('should return status 200 with correct params', async () => {  
    poisArrayMock.forEach(async (element: POIData) => {
      await POI.create(element)
    });
    
    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=10&coordinateX=20&coordinateY=10');

    const poisNearArray = [
      poisArrayMock[0],
      poisArrayMock[2],
      poisArrayMock[4],
      poisArrayMock[5]
    ];

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(4);
    expect(response.body.data).toEqual(
      expect.arrayContaining(poisNearArray)
    );
  });
  
  it('should return status 400 missing params', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity');    

    expect(response.status).toBe(400);    
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Invalid URL params');
  });
  
  it('should return status 400 with negative param', async () => {
    const response = await request(app)
      .get('/pointsOfInterest/byProximity?distance=-10&coordinateX=20&coordinateY=10');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Negative values are\'t accepted');
  });
});