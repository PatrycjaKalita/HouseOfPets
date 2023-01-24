const Animal = require("../models/animal");
const Category = require("../models/category");
const mongoose = require("mongoose");
const Product = require("../models/product");
const ObjectId = mongoose.Types.ObjectId;

exports.getAvailableCategories = async (req, res) => {
    try {
        const categories = await Category.find({})

        res.status(200).json({
            availableCategories: {
                categories
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Zwierzatka i kategorie."
        })
    }
}

exports.getAvailableBreeds = async (req, res) => {
    try {
        /*console.log(req.query.id)*/
        const animalTypeId = req.query.id

        let animalBreeds = await Animal.aggregate([
            {
                '$match': {
                    'type_of_pets_id': ObjectId(animalTypeId)
                }
            },
            {
                '$lookup': {
                    'from': 'breeds',
                    'localField': 'breed_id',
                    'foreignField': '_id',
                    'as': 'breeds'
                }
            }
        ])
        /*console.log(animalBreeds)*/

        const unformatedBreeds = animalBreeds.map((animal) => animal.breeds)
        const breedsArray = Array.prototype.concat(...unformatedBreeds)
        /*console.log(breedsArray)*/

        const breeds = breedsArray.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === breedsArray.findIndex(obj => {
                return JSON.stringify(obj) === _value;
            });
        });

        res.status(200).json({
            availableBreeds: {
                breeds
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Typy rasy."
        })
    }
}

exports.getAvailableAges = async (req, res) => {
    try {
        const animalBreedId = req.query.id

        let animalAges = await Animal.aggregate([
            {
                '$match': {
                    'breed_id': ObjectId(animalBreedId)
                }
            },
            {
                '$lookup': {
                    'from': 'ages',
                    'localField': 'age_id',
                    'foreignField': '_id',
                    'as': 'ages'
                }
            }
        ])
        const unformatedAges = animalAges.map((animal) => animal.ages)
        const agesArray = Array.prototype.concat(...unformatedAges)

        const ages = agesArray.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === agesArray.findIndex(obj => {
                return JSON.stringify(obj) === _value;
            });
        });

        res.status(200).json({
            availableAges: {
                ages
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Typy lata."
        })
    }
}

exports.getAvailableWeights = async (req, res) => {
    try {
        const animalAgeId = req.query.id

        let animalWeights = await Animal.aggregate([
            {
                '$match': {
                    'age_id': ObjectId(animalAgeId)
                }
            },
            {
                '$lookup': {
                    'from': 'weights',
                    'localField': 'weight_id',
                    'foreignField': '_id',
                    'as': 'weights'
                }
            }
        ])
        const unformatedWeights = animalWeights.map((animal) => animal.weights)
        const weightsArray = Array.prototype.concat(...unformatedWeights)

        const weights = weightsArray.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === weightsArray.findIndex(obj => {
                return JSON.stringify(obj) === _value;
            });
        });

        res.status(200).json({
            availableWeights: {
                weights
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Typy waga."
        })
    }
}


exports.postProductsList = async (req, res) => {
    try {
        const {
            category_id,
            type_of_pets_id,
            breed_id,
            age_id,
            weight_id
        } = req.body

        let products = await Product.aggregate([
            {
                '$lookup': {
                    'from': 'animals',
                    'localField': 'animal_id',
                    'foreignField': '_id',
                    'as': 'animals'
                }
            }
        ])

        if (category_id !== ''){
            products = products.filter(product => category_id === String(product.category_id))
        }

        if(type_of_pets_id !== '') {
            products = products.filter(product => type_of_pets_id === String(product.animals[0].type_of_pets_id))
        }

        if (breed_id !== ''){
            products = products.filter(product => breed_id === String(product.animals[0].breed_id))
        }

        if (age_id !== ''){
            products = products.filter(product => age_id === String(product.animals[0].age_id))
        }

        if (weight_id !== ''){
            products = products.filter(product => weight_id === String(product.animals[0].weight_id))
        }

        res.status(200).json({
            availableProducts: {
                products
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Typy waga."
        })
    }

}
