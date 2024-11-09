const validate = require("@i4nizer/obj-validator")


const userMiddleware = {

    /** Adds req.user */
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
    
    /** Adds req.user */
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


    

}


module.exports = userMiddleware