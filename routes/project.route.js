const express = require('express')
const router = express.Router()

const projectController = require('../controllers/project.controller')
const projectMiddleware = require('../middlewares/project.middleware')

const deviceMiddleware = require('../middlewares/device.middleware')
const deviceController = require('../controllers/device.controller')

const thresholdMiddleware = require('../middlewares/threshold.middleware')
const thresholdController = require('../controllers/threshold.controller')


router.route('/project')
    .get(projectMiddleware.validateGetProjects, projectController.getProjects)
    .post(projectMiddleware.validatePostProject, projectController.postProject)

router.get('/project/device', deviceController.getDevices)
router.get('/project/threshold', thresholdController.getThresholds)

router.route('/project/:projectId')
    .get(projectMiddleware.validateGetProject, projectController.getProject)
    .patch(projectMiddleware.validatePatchProject, projectController.patchProject)
    .delete(projectMiddleware.validateDeleteProject, projectController.deleteProject)

router.route('/project/:projectId/device')
    .get(deviceMiddleware.validateGetDevices, deviceController.getDevices)
    .post(deviceMiddleware.validatePostDevice, deviceController.postDevice)

router.route('/project/:projectId/device/:deviceId')
    .get(deviceMiddleware.validateGetDevice, deviceController.getDevice)
    .patch(deviceMiddleware.validatePatchDevice, deviceController.patchDevice)
    .delete(deviceMiddleware.validateDeleteDevice, deviceController.deleteDevice)

router.get('/project/:projectId/threshold', thresholdMiddleware.validateGetThreshold, thresholdController.getThreshold)
router.patch('/project/:projectId/threshold/:thresholdId', thresholdMiddleware.validatePatchThreshold, thresholdController.patchThreshold)


module.exports = router