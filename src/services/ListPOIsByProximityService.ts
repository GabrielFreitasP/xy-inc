import calculateDistance from '@utils/calculate-distance'

import POI from '@schemas/PointOfInterest';

import DistanceData from './structures/DistanceData';
import POIData from './structures/PointOfInterestData';

class ListPOIsByProximityService {
  async run(distanceData: DistanceData): Promise<POIData[]> {
    const poisArray = await POI.find({}).select('-_id name coordinateX coordinateY').lean() as POIData[];

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

      const distance = calculateDistance(informedPoint, point);

      if (distance <= distanceData.distance) {
        poisNearArray.push(poi)
      }
    });

    return poisNearArray;
  }
}

export default new ListPOIsByProximityService();