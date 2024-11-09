const mongoose = require('mongoose')


const thresholdSchema = new mongoose.Schema(
    {
        nitrogen: {
            min: { type: Number, default: 0 },
            max: { type: Number, default: 0 },
        },
        phosphorus: {
            min: { type: Number, default: 0 },
            max: { type: Number, default: 0 },
        },
        potassium: {
            min: { type: Number, default: 0 },
            max: { type: Number, default: 0 },
        },
        ph: {
            min: { type: Number, default: 0 },
            max: { type: Number, default: 0 },
        },
        activated: {
            type: Boolean,
            default: false,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        },
        
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Threshold', thresholdSchema)