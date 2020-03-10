import { Router } from 'express';

import POIsController from '@controllers/PointsOfInterestController'

const routes = Router();

routes.post('/pointsOfInterest', async (req, res) => {
  return await POIsController.create(req, res);
});

routes.get('/pointsOfInterest', async (req, res) => {
  return await POIsController.listAll(req, res);
});

routes.get('/pointsOfInterest/byProximity', async (req, res) => {
  return await POIsController.listByProximity(req, res);
});

export default routes;
