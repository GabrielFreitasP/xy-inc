import AuthService from '../../src/services/AuthService';

import FakeUserData from '../../src/services/structures/FakeUserData';

describe('Get Token', () => {
  it('should be able to generate a new token', () => {
    const user: FakeUserData = {
      username: 'test'
    };

    const token = AuthService.getToken(user);

    expect(token).toBeDefined();
  });
});

describe('Verify Token', () => {
  it('should be able verify if token is valid', async () => {
    const user: FakeUserData = {
      username: 'test'
    };
    
    const token = AuthService.getToken(user);

    const username = await AuthService.verifyToken(token);

    expect(username).toBe(user.username);
  });
});
