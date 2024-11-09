const mongoose = require('mongoose')


const sensorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        deviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device'
        },
        
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Sensor', sensorSchema)