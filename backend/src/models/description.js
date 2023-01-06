const mongoose = require('mongoose')

const descriptionSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        extra_description: {
            type: String
        },
        image: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Descriptions', descriptionSchema)
