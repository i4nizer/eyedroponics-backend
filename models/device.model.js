const mongoose = require('mongoose')


const deviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
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


module.exports = mongoose.model('Device', deviceSchema)