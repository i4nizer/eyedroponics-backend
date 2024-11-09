const mongoose = require('mongoose')


const alertSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        dismissed: {
            type: Boolean,
            default: false
        },
        ,
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('NPK', alertSchema)