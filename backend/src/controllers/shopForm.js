const Animal = require("../models/animal");
const Category = require("../models/category");
const mongoose = require("mongoose");
const Product = require("../models/product");
const ProductsSet = require("../models/productsSet")
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
        const animalTypeId = req.query.id
        let animalsAndTheirBreeds = await Animal.aggregate([
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
        const unformatedBreeds = animalsAndTheirBreeds.map((animal) => animal.breeds)
        const breedsArray = Array.prototype.concat(...unformatedBreeds)

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
        const {category_id, type_of_pets_id, breed_id, age_id, weight_id} = req.body

        let results
        /*Sprawdzenie czy to zestaw*/
        if (category_id === '63cc3e194c6402d09b507b67') {
            results = await ProductsSet.aggregate([
                {
                    '$lookup': {
                        'from': 'animals',
                        'localField': 'animal_id',
                        'foreignField': '_id',
                        'as': 'animals'
                    }
                }
            ])
        } else {
            results = await Product.aggregate([
                {
                    '$lookup': {
                        'from': 'animals',
                        'localField': 'animal_id',
                        'foreignField': '_id',
                        'as': 'animals'
                    }
                }
            ])
        }

        if (type_of_pets_id !== '') {
            results = results.filter(product => type_of_pets_id === String(product.animals[0].type_of_pets_id))
        }

        if(category_id !== '63cc3e194c6402d09b507b67'){
            if (category_id !== '') {
                results = results.filter(product => category_id === String(product.category_id))
            }
            if (breed_id !== '') {
                results = results.filter(product => breed_id === String(product.animals[0].breed_id))
            }
            if (age_id !== '') {
                results = results.filter(product => age_id === String(product.animals[0].age_id))
            }
            if (weight_id !== '') {
                results = results.filter(product => weight_id === String(product.animals[0].weight_id))
            }
        }

        res.status(200).json({
            availableProducts: {
                products: results
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Błąd w formularzu sklepu."
        })
    }
}
