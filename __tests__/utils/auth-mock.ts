import AuthService from '../../src/services/AuthService'

import FakeUserData from '../../src/services/structures/FakeUserData'

export default (): string => {
  const user: FakeUserData = {
    username: 'test'
  };

  return AuthService.getToken(user);
}
