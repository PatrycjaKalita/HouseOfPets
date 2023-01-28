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
        sale: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        image:{
            type: String,
        },
        set_code: {
            type: Number,
            required: true,
            min: 6,
        },
        category_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories'
        }],
        animal_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Animals'
        }],
        products_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }],
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('ProductsSets', productsSetSchema)
