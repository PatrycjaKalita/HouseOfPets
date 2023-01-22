const mongoose = require('mongoose')

const animalForAdoptionSchema = new mongoose.Schema(
    {
        link: {
            type: String,
            unique: true,
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
            required: true,
            lowercase: true
        },
        sex: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
            max: 9,
            min: 9
        },
        image: {
            type: String,
            trim: true
        },
        type_of_pets_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TypeOfAnimals'
        }],
        breed_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Breeds'
        }],
        age_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ages'
        }],
        weight_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Weights'
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('AnimalsForAdoptions', animalForAdoptionSchema)
