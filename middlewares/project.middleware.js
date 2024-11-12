const validate = require("@i4nizer/obj-validator")


const projectMiddleware = {

    /** Requires projectId in req.params */
    validateGetProject: (req, res, next) => {
        const { userId } = req.token
        const { projectId } = req.params
        if (!userId || !projectId) return res.status(400).send('User ID and project ID are required.')
        
        next()
    },
    
    /** Requires userId from req.token */
    validateGetProjects: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required.')
        
        next()
    },

    /** 
     * Requires userId from req.token
     * Requires name from req.body
     */
    validatePostProject: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required.')
        
        const fields = [{ name: 'name', max: 30 }]
        const { error } = validate(fields, req.body)
        if (error) return res.status(400).send(error)
        
        next()
    },
    
    /**
     * Requires userId from req.token
     * Requires projectId from req.params
     * Requires name from req.body
     */
    validatePatchProject: (req, res, next) => {
        const { userId } = req.token
        if (!userId) return res.status(401).send('User ID is required.')
        
        const { projectId } = req.params
        if (!projectId) return res.status(400).send('Project ID is required.')
        
        const fields = [ { name: 'name', max: 30 } ]
        const { error } = validate(fields, req.body)
        if (error) return res.status(400).send(error)
    
        next()
    },

    /** 
     * Requires userId from req.token
     * Requires projectId from req.params
     */
    validateDeleteProject: (req, res, next) => {
        const { userId } = req.token
        const { projectId } = req.params
        if (!userId || !projectId) return res.status(400).send('User ID and project ID are required.')
        
        next()
    }

}


module.exports = projectMiddleware