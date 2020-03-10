import MongoMock from '../utils/MongoMock';

import POIsService from '../../src/services/PointsOfInterestService';

import POI from '../../src/schemas/PointOfInterest';
import POIData from '../../src/services/structures/PointOfInterestData';

describe('Create Point of Interest', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await POI.deleteMany({});
  });

  it('should be able to create new point of interest', async () => {
    const poi: POIData = {
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: 12
    };

    await POIsService.create(poi);

    const poisArray = await POI.find({}).lean();

    expect(poisArray.length).toBe(1);
    expect(poisArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining(poi)
      ])
    );
  });

  it('should throw a validation error', async () => {
    const poi: POIData = {
      name: 'Lanchonete',
      coordinateX: 27,
      coordinateY: -12
    };

    try {
      await POIsService.create(poi);
    } catch (err) {
      expect(err.name).toEqual('ValidationError');
      expect(err._message).toEqual('PointOfInterest validation failed');
    }
  });
});
