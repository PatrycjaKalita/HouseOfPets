const mongoose = require('mongoose')

const weightSchema = new mongoose.Schema(
    {
        number: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Weight', weightSchema)
