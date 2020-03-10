import MongoMock from '../utils/MongoMock';
import poisArrayMock from '../utils/arrays-mock';

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

    const poisArray = await POIsService.listAll();

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