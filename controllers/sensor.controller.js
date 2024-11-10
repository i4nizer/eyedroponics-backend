const sensorModel = require('../models/sensor.model')


const sensorController = {

    getSensor: async (req, res) => {
        try {
            const { userId } = req.token
            const { deviceId, sensorId } = req.params

            const sensor = await sensorModel.findOne({ _id: sensorId, deviceId, userId })
            if (!sensor) return res.status(404).send('Sensor not found')
            
            res.send({ obj: sensor })

        } catch (error) { res.status(500).send(error.toString()) }
    },

    getSensors: async (req, res) => {
        try {
            const { userId } = req.token
            const { deviceId } = req.params

            const sensors = await sensorModel.find({ deviceId, userId })
            res.send({ obj: sensors })

        } catch (error) { res.status(500).send(error.toString()) }
    },

    postSensor: async (req, res) => {
        try {
            const { userId } = req.token
            const { deviceId } = req.params
            const { name } = req.body

            const sensorDoc = { name, deviceId, userId }
            const sensor = new sensorModel(sensorDoc)
            await sensor.save()
            
            sensorDoc._id = sensor._id
            res.send({ txt: 'Sensor added to device', obj: sensorDoc })

        } catch (error) { res.status(500).send(error.toString()) }
    },

    patchSensor: async (req, res) => {
        try {
            const { userId } = req.token
            const { deviceId, sensorId } = req.params
            const { name } = req.body

            const filter = { _id: sensorId, deviceId, userId }
            const sensor = await sensorModel.findOneAndUpdate(filter, { name }, { new: true })
            if (!sensor) return res.status(404).send('Sensor not found')
            
            const sensorDoc = { ...filter, name }
            res.send({ txt: 'Sensor updated', obj: sensorDoc })
            
        } catch (error) { res.status(500).send(error.toString()) }
    },

    deleteSensor: async (req, res) => {
        try {
            const { userId } = req.token
            const { deviceId, sensorId } = req.params

            const sensor = await sensorModel.findOneAndDelete({ _id: sensorId, deviceId, userId })
            if (!sensor) return res.status(404).send('Sensor not found')
            
            res.send({ txt: 'Sensor deleted' })

        } catch (error) { res.status(500).send(error.toString()) }
    },

}


module.exports = sensorController