const mongoose = require('mongoose')


const phSchema = new mongoose.Schema(
    {
        ph: {
            type: Number,
            required: true
        },
        sensorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('PH', phSchema)