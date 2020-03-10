import { isValidString } from '@utils/validations';

import AuthService from '@services/AuthService';

import FakeUserData from '@services/structures/FakeUserData';

class AuthController {

  async generateToken(req: any, res: any) {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
          success: false,
          message: 'No body content'
        });
      }

      const { username }: FakeUserData = req.body;
      if (!isValidString(username)) {
        return res.status(400).send({
          success: false,
          message: 'Invalid body content'
        });
      }

      const token = AuthService.getToken({ username });

      return res.status(201).send({
        success: true,
        data: token
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

export default new AuthController();
