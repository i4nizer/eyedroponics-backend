const express = require('express')
const router = express.Router()

const thresholdMiddleware = require('../middlewares/threshold.middleware')
const thresholdController = require('../controllers/threshold.controller')


router.get('/', thresholdMiddleware.validateGetThreshold, thresholdController.getThreshold)
router.get('/:thresholdId', thresholdMiddleware.validatePatchThreshold, thresholdController.patchThreshold)


module.exports = router