const mongoose = require('mongoose')

const dosageSchema = new mongoose.Schema(
    {
        body_weight: {
            type: Number,
        },
        moderate_needs: {
            type: Number,
        },
        low_needs: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Dosage', dosageSchema)
