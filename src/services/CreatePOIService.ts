import POIData from './structures/PointOfInterestData';

import POI from '@schemas/PointOfInterest';

class CreatePOIService {
  async run(poiData: POIData): Promise<any> {
    return await POI.create(poiData);
  }
}

export default new CreatePOIService();