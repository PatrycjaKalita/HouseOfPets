const mongoose = require('mongoose')

const animalForAdoptionSchema = new mongoose.Schema(
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
        address: {
            type: String,
            trim: true
        },
        short_description: {
            type: String,
            trim: true,
            required: true
        },
        added_to_adoption_date: {
            type: Date
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true
        },
        phone_number: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            max: 9
        },
        image: {
            type: String,
            trim: true
        },
        type_of_pets_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TypeOfAnimal'
        }],
        breed_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Breeds'
        }],
        age_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Age'
        }],
        weight_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Weight'
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('AnimalForAdoption', animalForAdoptionSchema)
