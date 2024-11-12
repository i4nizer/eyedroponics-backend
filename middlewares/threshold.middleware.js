const validate = require("@i4nizer/obj-validator")



const thresholdMiddleware = {

    /**
     * Requires userId in req.token
     * Requires projectId in req.params
     */
    validateGetThreshold: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')

        const { projectId } = req.params
        if (!projectId) return res.status(400).send('Project ID is required')
        
        next()
    },

    /**
     * Requires userId in req.token
     * Requires projectId in req.params
     * Optional nitrogen, phosphorus, potassium, ph, and activated in body
     */
    validatePatchThreshold: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required')

        const { projectId, thresholdId } = req.params
        if (!projectId || !thresholdId) return res.status(400).send('Project ID and threshold ID are required')
        
        const fields = [
            { name: 'nitrogen', required: false },
            { name: 'phosphorus', required: false },
            { name: 'potassium', required: false },
            { name: 'ph', required: false },
        ]
        const { error } = validate(fields, req.body)
        if (error) return res.status(400).send(error)
        
        next()
    }

}


module.exports = thresholdMiddleware