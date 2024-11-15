const express = require('express')
const router = express.Router()

const userRoutes = require('./user.route')
const deviceRoutes = require('./device.route')
const projectRoutes = require('./project.route')
const thresholdRoutes = require('./threshold.route')

const { checkAccessToken } = require('../middlewares/token.middleware')
const { checkUserID, checkProjectID } = require('../middlewares/req.middleware')


router.use(express.json())
router.use((req, res, next) => { console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`); next() })


router.use('/user', userRoutes)
router.use('/user/project', checkAccessToken, checkUserID, projectRoutes)
router.use('/user/project/:projectId/device', checkAccessToken, checkUserID, checkProjectID, deviceRoutes)
router.use('/user/project/:projectId/threshold', checkAccessToken, checkUserID, checkProjectID, thresholdRoutes)


module.exports = router