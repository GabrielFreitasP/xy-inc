import MongoMock from '../utils/MongoMock';

import ListPOIsByProximityService from '../../src/services/ListPOIsByProximityService';

import PointOfInterest from '../../src/schemas/PointOfInterest';

describe('List Points of Interest by Proximity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await PointOfInterest.deleteMany({});
  });

  it('should be able list interest point by proximity', async () => {
    await PointOfInterest.create({
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: 12
    });

    await PointOfInterest.create({
      name: 'Posto',
      coordinateX: 31,
      coordinateY: 18
    });

    await PointOfInterest.create({
      name: 'Joalheria',
      coordinateX: 15,
      coordinateY: 12
    });

    const arrayFromService = 
      await ListPOIsByProximityService.run({ distance: 10, coordinateX: 20, coordinateY: 10});

    const arrayFromDB = await PointOfInterest.find({}).lean();

    expect(arrayFromService).not.toEqual(arrayFromDB);
  });
});
