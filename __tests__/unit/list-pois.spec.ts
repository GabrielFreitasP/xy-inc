import MongoMock from '../utils/MongoMock';

import ListPOIsService from '../../src/services/ListPOIsService';

import InterestPoint from '../../src/schemas/PointOfInterest';

describe('List Points of Interest', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await InterestPoint.deleteMany({});
  });

  it('should be able list all points of interest', async () => {
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

    const arrayFromService = await ListPOIsService.run();

    const arrayFromDB = await InterestPoint.find({}).lean();

    expect(arrayFromService).toEqual(arrayFromDB);
  });
});
