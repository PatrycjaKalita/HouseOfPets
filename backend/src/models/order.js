const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        totalCost: {
            type: Number
        },
        status: {
            type: String
        },
        deliveryMethod:{
            type: String
        },
        deliveryCost:{
            type: Number
        },
        paymentMethod:{
            type: String
        },
        paymentCost:{
            type: Number
        },
        user: {
            login: {
                type: String,
                trim: true,
                required: true,
                max: 32
            },
            name: {
                type: String,
                trim: true,
                required: true,
                max: 32
            },
            lastname: {
                type: String,
                trim: true,
                required: true,
                max: 32
            },
            email: {
                type: String,
                trim: true,
                required: true,
                lowercase: true
            },
            phone_number: {
                type: String,
                trim: true,
                required: true,
                max: 9
            },
            street_and_number: {
                type: String,
                trim: true,
                required: true
            },
            postcode_and_city: {
                type: String,
                trim: true,
                required: true
            }
        },
        products: [{
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
        }],
        sets: [{
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
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Orders', orderSchema)
