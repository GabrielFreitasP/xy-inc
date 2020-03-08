import { Router } from 'express';

import CreateInterestPointService from '@services/CreateInterestPointService';
import ListInterestPointsService from '@services/ListInterestPointsService';

const routes = Router();

routes.post('/interestPoints', async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      success: false,
      message: 'No body content'
    });
  }

  const { name, coordinateX, coordinateY } = req.body;
  if (!name || !coordinateX || !coordinateY) {
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
  
  const interestPoint =
    await CreateInterestPointService.run({ name, coordinateX, coordinateY });

  return res.status(201).send({
    success: true,
    data: interestPoint
  });
});

routes.get('/interestPoints', async (req, res) => {
  const interestPointsArray = await ListInterestPointsService.run();

  return res.status(200).send({
    success: true,
    data: interestPointsArray
  });
});

export default routes;
