import MongoMock from '../utils/MongoMock';

import ListPOIsService from '../../src/services/ListPOIsService';

import POI from '../../src/schemas/PointOfInterest';

import { poisArrayMock } from '../utils/arrays-mock';

describe('List Points of Interest', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await POI.deleteMany({});
  });

  it('should be able list all points of interest', async () => {
    await POI.create(poisArrayMock);

    const poisArray = await ListPOIsService.run();

    expect(poisArray).toBeInstanceOf(Array);
    expect(poisArray.length).toBe(7);
    expect(poisArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining(poisArrayMock[0]),
        expect.objectContaining(poisArrayMock[1]),
        expect.objectContaining(poisArrayMock[2]),
        expect.objectContaining(poisArrayMock[3]),
        expect.objectContaining(poisArrayMock[4]),
        expect.objectContaining(poisArrayMock[5]),
        expect.objectContaining(poisArrayMock[6])
      ])
    );
  });
});
