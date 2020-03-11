import request from 'supertest';

import app from '../../src/app';

describe('Route to Health Check', () => {
  it('should return status 200 on checking server availability', async () => {
    const response = await request(app)
      .get('/ping');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toEqual('Server OK');
  });
});
