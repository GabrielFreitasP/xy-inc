import POI from '@schemas/PointOfInterest';

import POIData from './structures/PointOfInterestData';

class ListPOIsService {
  async run(): Promise<POIData[]> {
    return await POI.find({}).select('-_id name coordinateX coordinateY').lean();
  }
}

export default new ListPOIsService();