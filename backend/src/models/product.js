const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        link: {
            type: String,
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        producer: {
            type: String,
            trim: true,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        expiration_date: {
            type: Date
        },
        sale: {
            type: Number
        },
        weight: {
            type: Number,
        },
        color: {
            type: String
        },
        image: {
            type: String,
            trim: true
        },
        product_code: {
            type: Number,
            min: 6
        },
        animal_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Animals'
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories'
        },
        description: {
            type: String,
            required: true
        },
        extra_description: {
            type: String
        },
        image_description: {
            type: String
        },
        composition: {
            type: String,
            required: true
        },
        additives: {
            type: String,
            trim: true,
        },
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

module.exports = mongoose.model('Products', productSchema)
