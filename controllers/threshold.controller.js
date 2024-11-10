const thresholdModel = require('../models/threshold.model')


const thresholdController = {

    getThreshold: async (req, res) => {
        try {
            const { userId } = req.token
            const { projectId } = req.params

            const threshold = await threshold.findOne({ projectId, userId })
            if (!threshold) return res.status(404).send('Threshold not found')
            
            res.send({ obj: threshold })

        } catch (error) { res.status(500).send(error.toString()) }
    },

    patchThreshold: async (req, res) => {
        try {
            const { userId } = req.token
            const { projectId, thresholdId } = req.params
            const { nitrogen, phosphorus, potassium, ph, activated } = req.body

            const thresholdDoc = { nitrogen, phosphorus, potassium, ph, activated }
            const threshold = await thresholdModel.findOneAndUpdate({ _id: thresholdId, projectId, userId }, thresholdDoc, { new: true })
            if (!threshold) return res.status(404).send('Threshold not found')
            
            thresholdDoc._id = threshold._id
            res.send({ txt: 'Threshold udpated', obj: thresholdDoc })
            
        } catch (error) { res.status(500).send(error.toString()) }
    },

}


module.exports = thresholdController