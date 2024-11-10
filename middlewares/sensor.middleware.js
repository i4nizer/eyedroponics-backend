const validate = require("@i4nizer/obj-validator")



const sensorMiddleware = {

    /** 
     * Requires userId in req.token
     * Requires deviceId and sensorId in req.params
     */
    validateGetSensor: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { deviceId, sensorId } = req.params
        if (!deviceId || !sensorId) return res.status(400).send('Device ID and sensor ID are required')
        
        next()
    },

    /** 
     * Requires userId in req.token
     * Requires deviceId in req.params
     */
    validateGetSensors: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { deviceId } = req.params
        if (!deviceId) return res.status(400).send('Device ID is required')
        
        next()
    },

    /**
     * Requires userId in req.token
     * Requires deviceId in req.params
     * Requires name in req.body
     */
    validatePostSensor: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { deviceId } = req.params
        if (!deviceId) return res.status(400).send('Device ID is required')
        
        const fields = [{ name: 'name', min: 1, max: 30 }]
        const { error } = validate(fields, req.body)
        if (error) return res.status(400).send(error)
        
        next()
    },
    
    /**
     * Requires userId in req.token
     * Requires deviceId and sensorId in req.params
     * Requires name in req.body
     */
    validatePatchSensor: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { deviceId, sensorId } = req.params
        if (!deviceId || !sensorId) return res.status(400).send('Device ID and sensor ID are required')
        
        const fields = [{ name: 'name', min: 1, max: 30 }]
        const { error } = validate(fields, req.body)
        if (error) return res.status(400).send(error)
        
        next()
    },

    /**
     * Requires userId in req.token
     * Requires deviceId and sensorId in req.params
     */
    validateDeleteSensor: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')
        
        const { deviceId, sensorId } = req.params
        if (!deviceId || !sensorId) return res.status(400).send('Device ID and sensor ID are required')
        
        next()
    },

}


module.exports = sensorMiddleware