import { Router } from 'express';
import { isValidNumber } from '@utils/validations'

import CreatePOIService from '@services/CreatePOIService';
import ListPOIsService from '@services/ListPOIsService';
import ListPOIsByProximityService from '@services/ListPOIsByProximityService';

const routes = Router();

routes.post('/pointsOfInterest', async (req, res) => {
  try {
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
  }
  catch (err) {
    console.error(err);
    
    res.status(500).send({
      success: false,
      message: 'Internal server error'
    });
  }
});

routes.get('/pointsOfInterest', async (req, res) => {
  try {
    const poisArray = await ListPOIsService.run();

    return res.status(200).send({
      success: true,
      data: poisArray
    });
  }
  catch (err) {
    console.error(err);
    
    res.status(500).send({
      success: false,
      message: 'Internal server error'
    });
  }
});

routes.get('/pointsOfInterest/byProximity', async (req, res) => {
  try {
    if (!req.query) {
      return res.status(400).send({
        success: false,
        message: 'No URL params (distance, coordinateX, coordinateY)'
      });
    }

    const { distance, coordinateX, coordinateY } = req.query;
    if (!isValidNumber(distance) || !isValidNumber(coordinateY) || !isValidNumber(coordinateX)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid URL params'
      });
    }

    if (distance < 0 || coordinateX < 0 || coordinateY < 0) {
      return res.status(400).send({
        success: false,
        message: 'Negative values are\'t accepted'
      });
    }

    const poisArray = await ListPOIsByProximityService.run({ distance, coordinateX, coordinateY })

    return res.status(200).send({
      success: true,
      data: poisArray
    });
  }
  catch (err) {
    console.error(err);
    
    res.status(500).send({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default routes;
