import MongoMock from '../utils/MongoMock';

import ListAllInterestPointService from '../../src/services/ListInterestPointsService';

import InterestPoint from '../../src/schemas/InterestPoint';

describe('List All Interest Point', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await InterestPoint.deleteMany({});
  });

  it('should be able list all interest point', async () => {
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

    const arrayFromService = await ListAllInterestPointService.run();

    const arrayFromDB = await InterestPoint.find({}).lean();

    expect(arrayFromService).toEqual(arrayFromDB);
  });
});
