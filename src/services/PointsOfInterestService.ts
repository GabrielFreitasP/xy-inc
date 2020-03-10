import calculateDistance from '@utils/calculate-distance';

import POI from '@schemas/PointOfInterest';

import DistanceData from './structures/DistanceData';
import POIData from './structures/PointOfInterestData';

class PointsOfInterestService {

  async create(poiData: POIData): Promise<POIData> {
    return await POI.create(poiData) as POIData;
  }

  async listAll(): Promise<POIData[]> {
    return await POI.find({}).select('-_id name coordinateX coordinateY').lean();
  }

  async listByProximity(distanceData: DistanceData): Promise<POIData[]> {
    const poisArray: POIData[] = await POI.find({}).select('-_id name coordinateX coordinateY').lean();

    const informedPoint = {
      coordX: distanceData.coordinateX,
      coordY: distanceData.coordinateY
    };

    const poisNearArray = new Array<POIData>();
    poisArray.forEach(poi => {
      const point = {
        coordX: poi.coordinateX,
        coordY: poi.coordinateY
      };

      const distance = calculateDistance(informedPoint, point);

      if (distance <= distanceData.distance) {
        poisNearArray.push(poi)
      }
    });

    return poisNearArray;
  }
}

export default new PointsOfInterestService();