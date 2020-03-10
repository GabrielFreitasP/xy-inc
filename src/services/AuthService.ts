import authConfig from '@config/auth';
import jwt from 'jsonwebtoken';
import { isValidString } from '@utils/validations';

import FakeUserData from './structures/FakeUserData';

class AuthService {
  private generateToken = (params = {}): string => {
    const secret = authConfig.secret as string
    
    return jwt.sign(params, secret, {
      expiresIn: '1h',
    });
  }

  async run(user: FakeUserData): Promise<any> {
      if (!isValidString(user.username)) {
        return { 
          success: false, 
          message: 'Enter a username'
        };
      }
      
      const token = this.generateToken({ username: user.username });

			return { 
        success: true, 
        token
      };
  }
}

export default new AuthService();