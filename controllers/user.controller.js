const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userModel = require('../models/user.model')
const { accessKey, refreshKey, tokenLife } = require('../config/config')


const userController = {

    postSignUp: async (req, res) => {
        try {
            // create user
            req.user.role = 'User'
            req.user.password = crypto.createHash('sha256').update(req.user.password).digest('hex')
            const user = new userModel(req.user)
            await user.save()
            
            // create preference with userId

            // send user without password
            const data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                verified: user.verified,
                role: user.role,
            }

            res.send({ txt: `User account created successfully`, obj: { ...data } })

        } catch (error) { res.status(500).send(error.toString()) }
    },

    postSignIn: async (req, res) => {
        try {
            // find user
            req.user.password = crypto.createHash('sha256').update(req.user.password).digest('hex')
            const filter = { name: req.user.name, password: req.user.password }
            const user = await userModel.findOne(filter)
            if (!user) return res.status(404).send('Incorrect name or password')

            // create tokens
            const payload = { _id: user._id, verified: user.verified, role: user.role }
            const access = jwt.sign(payload, accessKey, { expiresIn: tokenLife })
            const refresh = jwt.sign(payload, refreshKey, { expiresIn: '7d' })

            // save token
            user.token = refresh
            await user.save()
            
            // send user and tokens
            const data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                verified: user.verified,
                role: user.role,
            }

            res.send({ txt: 'User signed-in successfully', obj: { ...data, access, refresh } })
            
        } catch (error) { res.status(500).send(error.toString()) }
    },

    postToken: async (req, res) => {
        try {
            // validate token
            const token = req.body?.token
            if (!token) return res.status(400).send('Refresh token required')
            jwt.verify(token, refreshKey)

            // find user with token
            const user = await userModel.findOne({ token })
            if (!user) return res.status(404).send('Invalid token')
            
            // issue new token
            const payload = { _id: user._id, verified: user.verified, role: user.role }
            const access = jwt.sign(payload, accessKey, { expiresIn: tokenLife })
            const refresh = jwt.sign(payload, refreshKey, { expiresIn: '7d' })

            // save token
            user.token = refresh
            await user.save()

            res.send({ txt: 'New tokens issued', obj: { access, refresh } })
            
        } catch (error) { res.status(500).send(error.toString()) }
    }

}


module.exports = userController