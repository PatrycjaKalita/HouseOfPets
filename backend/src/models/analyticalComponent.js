const mongoose = require('mongoose')

const analyticalComponentSchema = new mongoose.Schema(
    {
        protein: {
            type: Number,
        },
        fat: {
            type: Number,
        },
        ash: {
            type: Number,
        },
        fiber: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('AnalyticalComponents', analyticalComponentSchema)
