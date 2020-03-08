import { Router } from 'express';
import { isValidNumber } from '@utils/validations'

import CreatePOIService from '@services/CreatePOIService';
import ListPOIsService from '@services/ListPOIsService';
import ListPOIsByProximityService from '@services/ListPOIsByProximityService';

const routes = Router();

routes.post('/pointsOfInterest', async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      success: false,
      message: 'No body content'
    });
  }

  const { name, coordinateX, coordinateY } = req.body;
  if (!name || !isValidNumber(coordinateX) || !isValidNumber(coordinateY)) {
    return res.status(400).send({
      success: false,
      message: 'Invalid body content'
    });
  }

  if (coordinateX < 0 || coordinateY < 0) {
    return res.status(400).send({
      success: false,
      message: 'Negative values are\'t accepted'
    });
  }
  
  const poi = await CreatePOIService.run({ name, coordinateX, coordinateY });

  return res.status(201).send({
    success: true,
    data: poi
  });
});

routes.get('/pointsOfInterest', async (req, res) => {
  const poisArray = await ListPOIsService.run();

  return res.status(200).send({
    success: true,
    data: poisArray
  });
});

export default routes;
