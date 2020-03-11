import request from 'supertest';

import MongoMock from '../utils/MongoMock';
import getTokenMock from '../utils/auth-mock';
import app from '../../src/app';

import POI from '../../src/schemas/PointOfInterest';

describe('Route to Create Point of Interest', () => {
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

  it('should return status 201 on posting a valid body and a valid authorization token', async () => {
    const poi = {
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: 0
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi)
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(
      expect.objectContaining(poi)
    );
  });

  it('should return status 400 on posting any body', async () => {
    const response = await request(app)
      .post('/pointsOfInterest')
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('No body content');
  });

  it('should return status 400 on posting a body missing field', async () => {
    const poi = {
      name: 'Lanchonete',
      coordinateX: 27
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi)
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Invalid body content');
  });

  it('should return status 400 on posting an invalid type on body', async () => {
    const poi = {
      name: { value: 'Lanchonete' },
      coordinateX: 27,
      coordinateY: -12
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi)
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Invalid body content");
  });

  it('should return status 400 on posting a negative value on body', async () => {
    const poi = {
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: -12
    };

    const response = await request(app)
      .post('/pointsOfInterest')
      .send(poi)
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Negative values aren't accepted");
  });

  it('should return status 401 on posting any authorization token', async () => {
    const response = await request(app)
      .post('/pointsOfInterest');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('No token provided');
  });

  it('should return status 401 on setting a malformatted authorization token', async () => {
    const response = await request(app)
      .post('/pointsOfInterest')
      .set('Authorization', tokenMock);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Token malformatted');
  });

  it('should return status 401 on setting an invalid authorization token', async () => {
    const response = await request(app)
      .post('/pointsOfInterest')
      .set('Authorization', 'Bearer test');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Token invalid');
  });
});
