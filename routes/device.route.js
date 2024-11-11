const express = require('express')
const router = express.Router()

const deviceMiddleware = require('../middlewares/device.middleware')
const deviceController = require('../controllers/device.controller')


router.route('/:projectId/device')
    .get(deviceMiddleware.validateGetDevices, deviceController.getDevices)
    .post(deviceMiddleware.validatePostDevice, deviceController.postDevice)

router.route('/:projectId/device/:deviceId')
    .get(deviceMiddleware.validateGetDevice, deviceController.getDevice)
    .patch(deviceMiddleware.validatePatchDevice, deviceController.patchDevice)
    .delete(deviceMiddleware.validateDeleteDevice, deviceController.deleteDevice)


module.exports = router