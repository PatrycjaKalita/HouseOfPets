const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema(
    {
        type_of_pets_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TypesOfAnimals'
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

module.exports = mongoose.model('Animals', animalSchema)
