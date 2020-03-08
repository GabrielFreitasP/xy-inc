import CalculateDistance from '@utils/calculate-distance'
import DistanceData from './structures/DistanceData';
import InterestPointData from './structures/InterestPointData';

import InterestPoint from '@schemas/InterestPoint';

class ListInterestPointsByProximityService {
  async run(distanceData: DistanceData): Promise<any[]> {
    const interestPointsArray = await InterestPoint.find({}).lean();

    const informedPoint = {
      coordX: distanceData.coordinateX,
      coordY: distanceData.coordinateY
    };

    const interestPointsNearArray = [] as InterestPointData[];
    interestPointsArray.map(interestPoint => {
      const point = {
        coordX: interestPoint.coordinateX,
        coordY: interestPoint.coordinateY
      };

      const distance = CalculateDistance(informedPoint, point);

      if (distance <= distanceData.distance) {
        interestPointsNearArray.push(interestPoint)
      }
    });

    return interestPointsNearArray;
  }
}

export default new ListInterestPointsByProximityService();