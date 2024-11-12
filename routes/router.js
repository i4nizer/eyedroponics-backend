const express = require('express')
const router = express.Router()

const userRoutes = require('./user.route')


router.use(express.json())
router.use((req, res, next) => { console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`); next() })

router.use('/api', userRoutes)


module.exports = router