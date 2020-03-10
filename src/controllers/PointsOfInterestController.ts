import { isValidString, isValidNumber } from '@utils/validations';

import POIsService from '@services/PointsOfInterestService';

import POIData from '@services/structures/PointOfInterestData';
import DistanceData from '@services/structures/DistanceData';

class PointsOfInterestController {

  async create(req: any, res: any) {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
          success: false,
          message: 'No body content'
        });
      }
      
      const { name, coordinateX, coordinateY }: POIData = req.body;
      if (!isValidString(name) || !isValidNumber(coordinateX) || !isValidNumber(coordinateY)) {
        return res.status(400).send({
          success: false,
          message: 'Invalid body content'
        });
      }
      
      if (coordinateX < 0 || coordinateY < 0) {
        return res.status(400).send({
          success: false,
          message: "Negative values aren't accepted"
        });
      }
      
      const poi: POIData = await POIsService.create({ name, coordinateX, coordinateY });
      
      return res.status(201).send({
        success: true,
        data: poi
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
  
  async listAll(req: any, res: any) {
    try {
      const poisArray: POIData[] = await POIsService.listAll();
  
      return res.status(200).send({
        success: true,
        data: poisArray
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
  
  async listByProximity(req: any, res: any) {
    try {
      if (Object.keys(req.query).length === 0) {
        return res.status(400).send({
          success: false,
          message: 'No query content'
        });
      }

      const { distance, coordinateX, coordinateY }: DistanceData = {
        distance: parseInt(req.query.distance),
        coordinateX: parseInt(req.query.coordinateX),
        coordinateY: parseInt(req.query.coordinateY)
      };
      if (!isValidNumber(distance) || !isValidNumber(coordinateX) || !isValidNumber(coordinateY)) {
        return res.status(400).send({
          success: false,
          message: 'Invalid query content'
        });
      }
      
      if (distance < 0 || coordinateX < 0 || coordinateY < 0) {
        return res.status(400).send({
          success: false,
          message: "Negative values aren't accepted"
        });
      }
      
      const poisArray: POIData[] = await POIsService.listByProximity({ distance, coordinateX, coordinateY });
      
      return res.status(200).send({
        success: true,
        data: poisArray
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

export default new PointsOfInterestController();