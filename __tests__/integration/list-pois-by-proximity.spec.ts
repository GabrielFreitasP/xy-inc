import MongoMock from '../utils/MongoMock';

import POIsService from '../../src/services/PointsOfInterestService';

import POI from '../../src/schemas/PointOfInterest';

import { poisArrayMock } from '../utils/arrays-mock';

describe('List Points of Interest by Proximity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await POI.deleteMany({});
  });

  it('should be able list interest point by proximity', async () => {
    await POI.create(poisArrayMock);

    const poisArray =
      await POIsService.listByProximity({ distance: 10, coordinateX: 20, coordinateY: 10 });

    expect(poisArray).toBeInstanceOf(Array);
    expect(poisArray.length).toBe(4);
    expect(poisArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining(poisArrayMock[0]),
        expect.objectContaining(poisArrayMock[2]),
        expect.objectContaining(poisArrayMock[4]),
        expect.objectContaining(poisArrayMock[5])
      ])
    );
  });
});
