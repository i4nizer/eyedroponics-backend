const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')


router.post('/sign-up', userMiddleware.validateSignUp, userController.postSignUp)
router.post('/sign-in', userMiddleware.validateSignIn, userController.postSignIn)

router.post('/token', userController.postToken)


module.exports = router