import CalculateDistance from '@utils/calculate-distance'
import DistanceData from './structures/DistanceData';
import POIData from './structures/PointOfInterestData';

import POI from '@schemas/PointOfInterest';

class ListPOIsByProximityService {
  async run(distanceData: DistanceData): Promise<any[]> {
    const poisArray = await POI.find({}).lean();

    const informedPoint = {
      coordX: distanceData.coordinateX,
      coordY: distanceData.coordinateY
    };

    const poisNearArray = [] as POIData[];
    poisArray.map(poi => {
      const point = {
        coordX: poi.coordinateX,
        coordY: poi.coordinateY
      };

      const distance = CalculateDistance(informedPoint, point);

      if (distance <= distanceData.distance) {
        poisNearArray.push(poi)
      }
    });

    return poisNearArray;
  }
}

export default new ListPOIsByProximityService();