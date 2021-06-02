const express = require('express');
const router = express.Router();

const pointsController = require('../controllers/points.controller');

router.get('/getServicePoints', pointsController.getServicePoints);

router.get('/getPointsPrice', pointsController.getPointsPrice);

router.get('/getPacks', pointsController.getPacks);

router.post('/payment', pointsController.payment);

module.exports = router;