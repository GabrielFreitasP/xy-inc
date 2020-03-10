import authConfig from '@config/auth';
import jwt from 'jsonwebtoken';

import FakeUserData from './structures/FakeUserData';

class AuthService {
  getToken(user: FakeUserData): string {
    const params = { username: user.username };
    
    const secret = authConfig.secret as string;     

    return jwt.sign(params, secret, {
      expiresIn: '1h',
    });
  }
}

export default new AuthService();