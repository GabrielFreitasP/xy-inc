import POI from '@schemas/PointOfInterest';

import POIData from './structures/PointOfInterestData';

class CreatePOIService {
  async run(poiData: POIData): Promise<POIData> {
    return await POI.create(poiData) as POIData;
  }
}

export default new CreatePOIService();