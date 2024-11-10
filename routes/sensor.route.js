const express = require('express')
const router = express.Router()

const sensorMiddleware = require('../middlewares/sensor.middleware')
const sensorController = require('../controllers/sensor.controller')


router.route('/')
    .get(sensorMiddleware.validateGetSensors, sensorController.getSensors)
    .post(sensorMiddleware.validatePostSensor, sensorController.postSensor)

router.route('/:sensorId')
    .get(sensorMiddleware.validateGetSensor, sensorController.getSensor)
    .patch(sensorMiddleware.validatePatchSensor, sensorController.patchSensor)
    .delete(sensorMiddleware.validateDeleteSensor, sensorController.deleteSensor)


module.exports = router