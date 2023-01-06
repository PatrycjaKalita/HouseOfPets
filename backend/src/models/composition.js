const mongoose = require('mongoose')

const compositionSchema = new mongoose.Schema(
    {
        composition: {
            type: String,
            required: true
        },
        additives: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Compositions', compositionSchema)
