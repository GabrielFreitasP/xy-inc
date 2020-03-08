import MongoMock from '../utils/MongoMock';
import InterestPointData from '../../src/services/structures/PointOfInterestData';

import CreatePOIService from '../../src/services/CreatePOIService';

import InterestPoint from '../../src/schemas/PointOfInterest';

describe('Create Point of Interest', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await InterestPoint.deleteMany({});
  });

  it('should be able to create new point of interest', async () => {
    const interestPoint: InterestPointData = {
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: 12
    };

    await CreatePOIService.run(interestPoint);

    const interestPointsArray = await InterestPoint.find({});

    expect(interestPointsArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining(interestPoint)
      ])
    );
  });
});
