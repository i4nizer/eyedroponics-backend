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
        ,
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('PH', phSchema)