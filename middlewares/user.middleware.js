const jwt = require('jsonwebtoken')
const config = require('../config/config')
const validate = require("@i4nizer/obj-validator")


const userMiddleware = {

    /** Forcely sets req.role */
    setRole: (role) => {
        return (req, res, next) => {
            req.role = role
            next()
        }
    },

    /** Requires name, email, and password in req.body */
    validateSignUp: (req, res, next) => {
        const fields = [
            { name: 'name', min: 3, max: 50 },
            { name: 'email', min: 5, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
            { name: 'password', min: 8, },
        ]

        const { error, result } = validate(fields, req.body)
        if (error) return res.status(400).send(error)
        
        req.user = result
        next()
    },
    
    /** Requires name and password in req.body */
    validateSignIn: (req, res, next) => {
        const fields = [
            { name: 'name', min: 3, max: 50 },
            { name: 'password', min: 8, },
        ]

        const { error, result } = validate(fields, req.body)
        if (error) return res.status(400).send(error)
        
        req.user = result
        next()
    },

    /** Requires authorization in req.headers */
    validateAccessToken: (req, res, next) => {
        try {
            const token = req.headers['authorization']?.split(' ')[1]
            if (!token) return res.status(400).send('No token provided')
            
            const payload = jwt.verify(token, config.accessKey)
            req.token = payload
            next()
        } catch (error) { res.status(400).send('Invalid or expired token') }
    },
    
    /** Requires token in req.body */
    validateRefreshToken: (req, res, next) => {
        try {
            const token = req?.body.token
            if (!token) return res.status(400).send('No token provided')
            
            jwt.verify(token, config.refreshKey)
            next()
        } catch (error) { res.status(400).send('Invalid or expired token') }
    },

}


module.exports = userMiddleware