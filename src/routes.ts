import { Router } from 'express';

import CreateInterestPointService from '@services/CreateInterestPointService';

const routes = Router();

routes.post('/interestPoints', async (req, res) => {
  if (!req.body) return res.status(400).send({ status: 400, message: 'No body content' })

  const { name, coordinateX, coordinateY } = req.body;
  if (!name || !coordinateX || !coordinateY) return res.status(400).send({ status: 400, message: 'Invalid body content' })
  
  const interestPoints = await CreateInterestPointService.run({ name, coordinateX, coordinateY });

  return res.status(201).send({ status: 201, data: interestPoints });
});

export default routes;
