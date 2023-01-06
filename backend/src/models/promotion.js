const mongoose = require('mongoose')

const promotionSchema = new mongoose.Schema(
    {
        discount: {
            type: Number,
            required: true
        },
        end_of_promotion_date: {
            type: Date,
            required: true
        },
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

module.exports = mongoose.model('Promotions', promotionSchema)
