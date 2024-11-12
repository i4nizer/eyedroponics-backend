const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')

const projectRoutes = require('./project.route')


router.post('/user/sign-up', userMiddleware.validateSignUp, userMiddleware.setRole('User'), userController.postSignUp)
router.post('/user/sign-in', userMiddleware.validateSignIn, userMiddleware.setRole('User'), userController.postSignIn)
router.post('/user/token', userMiddleware.validateRefreshToken, userController.postRefreshToken)

router.use('/user', userMiddleware.validateAccessToken, projectRoutes)


module.exports = router