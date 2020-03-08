import MongoMock from '../utils/MongoMock';
import request from 'supertest';

import app from '../../src/app';
import InterestPoint from '../../src/schemas/PointOfInterest';

describe('Route to Create Point of Interest', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });
  
  afterAll(async () => {
    await MongoMock.disconnect();
  });
  
  beforeEach(async () => {
    await InterestPoint.deleteMany({});
  });
  
  it('should return status created', async () => {
    const interestPoint = { 
      name: 'Lanchonete', 
      coordinateX: 27, 
      coordinateY: 12 
    };

    const response = await request(app)
      .post('/interestPoints')
      .send(interestPoint);

    expect(response.status).toBe(201);
  });
  
  it('should return status bad request', async () => {
    const interestPoint = { 
      name: 'Lanchonete', 
      coordinateX: 27
    };

    const response = await request(app)
      .post('/interestPoints')
      .send(interestPoint);

    expect(response.status).toBe(400);
  });
});
