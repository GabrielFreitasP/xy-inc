import InterestPoint from '../schemas/InterestPoint';

class ListInterestPointsService {
  async run(): Promise<any[]> {
    return await InterestPoint.find({}).lean();
  }
}

export default new ListInterestPointsService();