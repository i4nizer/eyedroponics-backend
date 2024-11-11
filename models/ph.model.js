const mongoose = require('mongoose')


const phSchema = new mongoose.Schema(
    {
        ph: {
            type: Number,
            required: true
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


module.exports = mongoose.model('PH', phSchema)