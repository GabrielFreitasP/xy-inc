import MongoMock from '../utils/MongoMock';
import InterestPointData from '../../src/services/structures/InterestPointData';

import CreateInterestPointService from '../../src/services/CreateInterestPointService';

import InterestPoint from '../../src/schemas/InterestPoint';

describe('Create Interest Point', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await InterestPoint.deleteMany({});
  });

  it('should be able to create new interest point', async () => {
    const interestPoint: InterestPointData = {
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: 12
    };

    await CreateInterestPointService.run(interestPoint);

    const interestPointsArray = await InterestPoint.find({});

    expect(interestPointsArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining(interestPoint)
      ])
    );
  });
});
