const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        link: {
            type: String,
            /*required: true*/
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
            /*required: true,*/
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
        description_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Descriptions'
        },
        composition_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Compositions'
        },
        analytical_component_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AnalyticalComponents'
        },
        dosage_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dosage'
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Products', productSchema)
