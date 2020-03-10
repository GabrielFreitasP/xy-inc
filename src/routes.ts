import { Router } from 'express';
import { authMiddleware } from '@middleware/auth';

import POIsController from '@controllers/PointsOfInterestController'

const routes = Router();

routes.post('/pointsOfInterest', authMiddleware, async (req, res) => {
  return await POIsController.create(req, res);
});

routes.get('/pointsOfInterest', authMiddleware, async (req, res) => {
  return await POIsController.listAll(req, res);
});

routes.get('/pointsOfInterest/byProximity', authMiddleware, async (req, res) => {
  return await POIsController.listByProximity(req, res);
});

export default routes;
