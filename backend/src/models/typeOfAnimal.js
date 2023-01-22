const mongoose = require('mongoose')

const typeOfAnimalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('TypeOfAnimals', typeOfAnimalSchema)
