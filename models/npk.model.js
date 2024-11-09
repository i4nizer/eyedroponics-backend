const mongoose = require('mongoose')


const npkSchema = new mongoose.Schema(
    {
        nitrogen: {
            type: Number,
            required: true
        },
        phosphorus: {
            type: Number,
            required: true,
        },
        potassium: {
            type: Number,
            required: true,
        },
        sensorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('NPK', npkSchema)