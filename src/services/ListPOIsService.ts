import POI from '@schemas/PointOfInterest';

class ListPOIsService {
  async run(): Promise<any[]> {
    return await POI.find({}).lean();
  }
}

export default new ListPOIsService();