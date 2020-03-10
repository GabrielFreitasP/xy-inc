import { Router } from 'express';
import authMiddleware from '@middleware/auth';

import AuthController from '@controllers/AuthController';
import POIsController from '@controllers/PointsOfInterestController';

const routes = Router();

routes.post('/token', AuthController.getToken);

routes.post('/pointsOfInterest', authMiddleware, POIsController.create);

routes.get('/pointsOfInterest', authMiddleware, POIsController.listAll);

routes.get('/pointsOfInterest/byProximity', authMiddleware, POIsController.listByProximity);

export default routes;
