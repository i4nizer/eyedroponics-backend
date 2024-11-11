const validate = require("@i4nizer/obj-validator")



const deviceMiddleware = {

    /** 
     * Requires userId in req.token
     * Requires projectId and deviceId in req.params
     */
    validateGetDevice: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { projectId, deviceId } = req.params
        if (!projectId || !deviceId) return res.status(400).send('Project ID and device ID are required')
        
        next()
    },

    /**
     * Requires userId in req.token
     * Requires projectId in req.params
     */
    validateGetDevices: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { projectId } = req.params
        if (!projectId) return res.status(400).send('Project ID is required.')
        
        next()
    },

    /** 
     * Requires userId in req.token
     * Requires projectId in req.params
     * Requires name in req.body
     */
    validatePostDevice: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { projectId } = req.params
        if (!projectId) return res.status(400).send('Project ID is required')
        
        const fields = [
            { name: 'name', min: 1, max: 30 },
            { name: 'sensors', min: 2, max: 6, required: false },
        ]
        const { error } = validate(fields, req.body)
        if (error) return res.status(400).send(error)
        
        next()
    },
    
    /**
     * Requires userId in req.token
     * Requires projectId and deviceId in req.params
     * Requires name in req.body
     */
    validatePatchDevice: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { projectId, deviceId } = req.params
        if (!projectId || !deviceId) return res.status(400).send('Project ID and device ID are required')
        
        const fields = [
            { name: 'name', min: 1, max: 30 },
            { name: 'sensors', min: 2, max: 6, required: false },
        ]
        const { error } = validate(fields, req.body)
        if (error) return res.status(400).send(error)
        
        next()
    },

    /**
     * Requires userId in req.token
     * Requires projectId and deviceId in req.params
     */
    validateDeleteDevice: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { projectId } = req.params
        if (!projectId) return res.status(400).send('Project ID is required')
        
        next()
    },

}


module.exports = deviceMiddleware