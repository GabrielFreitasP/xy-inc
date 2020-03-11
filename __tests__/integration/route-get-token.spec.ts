import request from 'supertest';

import app from '../../src/app';

describe('Route to Get Token', () => {
  it('should return status 200 and get a token on posting a valid body', async () => {
    const user = {
      username: 'test'
    };

    const response = await request(app)
      .post('/token')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
  });

  it('should return status 400 on posting any body', async () => {
    const response = await request(app)
      .post('/token');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('No body content');
  });

  it('should return status 400 on posting an invalid body', async () => {
    const user = {
      username: { value: 'test' }
    };

    const response = await request(app)
      .post('/token')
      .send(user)

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Invalid body content");
  });
});
