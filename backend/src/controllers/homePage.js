const Product = require("../models/product");
const AnimalForAdoption = require("../models/animalForAdoption");

exports.getAvailableProductsToBestsellerTable = async (req, res) => {
    try {
        const product = await Product.find({}).limit(6)

        res.status(200).json({
            availableProductsList: {
                product
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}

exports.getAvailableAnimalsToSlider = async (req, res) => {
    try {
        const animal = await AnimalForAdoption.aggregate([
            {
                '$lookup': {
                    'from': 'breeds',
                    'localField': 'breed_id',
                    'foreignField': '_id',
                    'as': 'breeds'
                }
            }
        ]).limit(9)

        res.status(200).json({
            availableAnimalsList: {
                animal
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy zwierat."
        })
    }
}
