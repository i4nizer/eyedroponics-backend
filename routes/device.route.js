const express = require('express')
const router = express.Router()

const deviceMiddleware = require('../middlewares/device.middleware')
const deviceController = require('../controllers/device.controller')

const sensorRoutes = require('./sensor.route')


router.route('/')
    .get(deviceMiddleware.validateGetDevices, deviceController.getDevices)
    .post(deviceMiddleware.validatePostDevice, deviceController.postDevice)

router.route('/:deviceId')
    .get(deviceMiddleware.validateGetDevice, deviceController.getDevice)
    .patch(deviceMiddleware.validatePatchDevice, deviceController.patchDevice)
    .delete(deviceMiddleware.validateDeleteDevice, deviceController.deleteDevice)

router.use('/:deviceId/sensor', sensorRoutes)


module.exports = router