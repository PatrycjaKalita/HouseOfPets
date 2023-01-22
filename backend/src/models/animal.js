const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema(
    {
        type_of_pets_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TypeOfAnimals',
        },
        breed_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Breeds'
        },
        age_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ages'
        },
        weight_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Weights'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Animals', animalSchema)
