const mongoose = require('mongoose')

const ageSchema = new mongoose.Schema(
    {
        number_with_name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Age', ageSchema)
