const deviceModel = require('../models/device.model')


const deviceController = {

    getDevice: async (req, res) => {
        try {
            const { userId } = req.token
            const { projectId, deviceID } = req.params

            const device = await deviceModel.findOne({ _id: deviceID, projectId, userId })
            if (!device) return res.status(404).send('Device not found')
            
            res.send({ obj: device })
            
        } catch (error) { res.status(500).send(error.toString()) }
    },

    getDevices: async (req, res) => {
        try {
            const { userId } = req.token
            const { projectId } = req.params

            const devices = await deviceModel.find({ projectId, userId })
            res.send({ obj: devices })

        } catch (error) { res.status(500).send(error.toString()) }
    },

    postDevice: async (req, res) => {
        try {
            const { userId } = req.token
            const { projectId } = req.params
            const { name, key = '' } = req.body
            
            const deviceDoc = { name, key, projectId, userId }
            const device = new deviceModel(deviceDoc)
            await device.save()

            res.send({ txt: 'Device added to project', obj: deviceDoc })

        } catch (error) { res.status(500).send(error.toString()) }
    },

    patchDevice: async (req, res) => {
        try {
            const { userId } = req.token
            const { name, key = '' } = req.body
            const { projectId, deviceId } = req.params
            
            const deviceDoc = { name, key, projectId, userId }
            const device = await deviceModel.findOneAndUpdate({ _id: deviceId }, deviceDoc, { new: true })
            deviceDoc._id = device._id

            res.send({ txt: 'Device updated', obj: deviceDoc })

        } catch (error) { res.status(500).send(error.toString()) }
    },

    deleteDevice: async (req, res) => {
        try {
            const { userId } = req.token
            const { projectId, deviceId } = req.params

            const device = await deviceModel.findOneAndDelete({ _id: deviceId, userId, projectId })
            if (!device) return res.status(404).send('Device not found')
            
            res.send({ txt: 'Device deleted' })

        } catch (error) { res.status(500).send(error.toString()) }
    },

    

}


module.exports = deviceController