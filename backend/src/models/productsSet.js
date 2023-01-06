const mongoose = require('mongoose')

const productsSetSchema = new mongoose.Schema(
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
        price: {
            type: Number,
            required: true
        },
        set_code: {
            type: Number,
            required: true,
            min: 6
        },
        animal_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Animals'
        }],
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('ProductsSets', productsSetSchema)
