import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

import FakeUserData from './structures/FakeUserData';

class AuthService {

  getToken(user: FakeUserData): string {
    const params = { username: user.username };

    const secret = authConfig.secret as string;

    return jwt.sign(params, secret, {
      expiresIn: '1h',
    });
  }

  verifyToken(token: string): Promise<string> {
    const secret = authConfig.secret as string;

    return new Promise<string>((resolve, reject) => {
      jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) reject(err);

        resolve(decoded.username);
      });
    });
  }
}

export default new AuthService();
