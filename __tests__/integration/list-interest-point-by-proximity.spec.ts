import MongoMock from '../utils/MongoMock';

import ListInterestPointsByProximityService from '../../src/services/ListInterestPointsByProximityService';

import InterestPoint from '../../src/schemas/InterestPoint';

describe('List Interest Points By Proximity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await InterestPoint.deleteMany({});
  });

  it('should be able list interest point by proximity', async () => {
    await InterestPoint.create({
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: 12
    });

    await InterestPoint.create({
      name: 'Posto',
      coordinateX: 31,
      coordinateY: 18
    });

    await InterestPoint.create({
      name: 'Joalheria',
      coordinateX: 15,
      coordinateY: 12
    });

    const arrayFromService = 
      await ListInterestPointsByProximityService.run({ distance: 10, coordinateX: 20, coordinateY: 10});

    const arrayFromDB = await InterestPoint.find({}).lean().remove(1);

    expect(arrayFromService).toEqual(arrayFromDB);
  });
});
