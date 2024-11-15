const express = require('express')
const router = express.Router()

const { checkRefreshToken } = require('../middlewares/token.middleware')
const { validateSignUp, validateSignIn, setRole } = require('../middlewares/user.middleware')

const { postSignUp, postSignIn, postRefreshToken } = require('../controllers/user.controller')


router.post('/sign-up', validateSignUp, setRole('User'), postSignUp)
router.post('/sign-in', validateSignIn, setRole('User'), postSignIn)
router.post('/token', checkRefreshToken, postRefreshToken)


module.exports = router