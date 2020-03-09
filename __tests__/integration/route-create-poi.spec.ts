import MongoMock from '../utils/MongoMock';
import request from 'supertest';
import app from '../../src/app';

import POI from '../../src/schemas/PointOfInterest';

describe('Route to Create Point of Interest', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await POI.deleteMany({});
  });

  it('should return status 201 with correct params', async () => {
    const poi = {
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: 0
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(
      expect.objectContaining(poi)
    );
  });

  it('should return status 400 without body', async () => {
    const response = await request(app)
      .post('/pointsOfInterest')
      .send();

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('No body content');
  });

  it('should return status 400 missing field on body', async () => {
    const poi = {
      name: 'Lanchonete',
      coordinateX: 27
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Invalid body content');
  });

  it('should return status 400 with params with object', async () => {
    const poi = {
      name: { value: 'Lanchonete' },
      coordinateX: 27,
      coordinateY: -12
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Invalid body content");
  });

  it('should return status 400 with params with negative values', async () => {
    const poi = {
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: -12
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Negative values aren't accepted");
  });
});
