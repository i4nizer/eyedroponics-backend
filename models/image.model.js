const mongoose = require('mongoose')


const imageSchema = new mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: true
        },
        pestDetected: {
            type: String,
            enum: [
                'None',
                'Aphids',
                'Cutworms',
                'Leafminers',
                'Armyworms',
                'Thrips',
                'Flea Beetles',
                'Slugs',
                'Snails',
                'Whiteflies',
            ],
            default: 'None'
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


module.exports = mongoose.model('Image', imageSchema)