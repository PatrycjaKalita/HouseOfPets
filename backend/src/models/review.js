const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: true
        },
        stars: {
            type: Number,
            required: true
        },
        user_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        set_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductsSets'
        }],
        product_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Reviews', reviewSchema)
