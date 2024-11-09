const mongoose = require('mongoose')


const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
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


module.exports = mongoose.model('Project', projectSchema)