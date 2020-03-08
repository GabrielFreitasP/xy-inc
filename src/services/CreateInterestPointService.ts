import InterestPointData from './structures/InterestPointData';

import InterestPoint from '@schemas/InterestPoint';

class CreateInterestPointService {
  async run(interestPointData: InterestPointData): Promise<any> {
    return await InterestPoint.create(interestPointData);
  }
}

export default new CreateInterestPointService();