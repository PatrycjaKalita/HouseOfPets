const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        link: {
            type: String,
            required: true
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Categories', categorySchema)
