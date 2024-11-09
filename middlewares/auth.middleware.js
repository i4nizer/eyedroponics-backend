const jwt = require('jsonwebtoken')
const config = require('../config/config')
const apiKeyModel = require('../models/apikey.model')


const authMiddleware = {

    /**
     * Authorize only specific roles on this route via valid token
     * 
     * @param {string[]} roles Array of roles to allow
     * @returns Middleware 
     */
    authorizeToken: (roles) => {

        return (req, res, next) => {
            try {
                // get token payload {userId, verified, role}
                const token = req.headers['authorization']?.split(' ')[1]
                if (!token) return res.status(401).send('Access token is required')
                const payload = jwt.verify(token, config.jwtSecret)
                
                // check verified   
                const verified = payload?.verified
                if (!verified) return res.status(403).send(`User is not yet verified`)

                // check role
                const role = payload?.role
                if (!role && !roles.includes(role)) return res.status(403).send(`User is forbidden to access this route`)
                
                req.token = payload
                next()
            } catch (error) { res.status(401).send('Invalid or expired token') }
        }
    },

    /** Check if the API Key is valid in database */
    validateApiKey: async (req, res, next) => {
        
        try {
            const key = req.headers['x-api-key']
            if (!key) return res.status(401).send('API key is missing')
            
            const apiKey = await apiKeyModel.findOne({ key, isRevoked: false })
            if (!apiKey) return res.status(403).send('Invalid API key')

            next()
        } catch (error) { res.status(401).send('Invalid revoked API key') }
    },

}


module.exports = authMiddleware