const Product = require('../models/product')
const Animal = require('../models/animal')
const TypeOfAnimals = require('../models/typeOfAnimal')
const Category = require('../models/category')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addingProduct = async (req, res) => {
    const {
        link,
        name,
        producer,
        price,
        amount,
        expiration_date,
        weight,
        color,
        image,
        product_code,
        sale,
        animal_id,
        category_id,
        description,
        extra_description,
        image_description,
        composition,
        additives,
        protein,
        fat,
        ash,
        fiber,
        body_weight,
        moderate_needs,
        low_needs
    } = req.body

    let newProduct = new Product({
        link,
        name,
        producer,
        price,
        amount,
        expiration_date,
        weight,
        sale,
        color,
        image,
        product_code,
        animal_id,
        category_id,
        description,
        extra_description,
        image_description,
        composition,
        additives,
        protein,
        fat,
        ash,
        fiber,
        body_weight,
        moderate_needs,
        low_needs
    })

    //zapisanie do bazy
    newProduct.save((err, success) => {
        if (err) {
            console.log('Błąd dodawania produktu', err)
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Produkt dodany!'
        })
    })
}

exports.getAvailableProductDetails = async (req, res) => {
    try {
        const animals = await Animal.aggregate([
            {
                '$lookup': {
                    'from': 'typeofanimals',
                    'localField': 'type_of_pets_id',
                    'foreignField': '_id',
                    'as': 'typeofanimals'
                }
            },
            {
                '$lookup': {
                    'from': 'breeds',
                    'localField': 'breed_id',
                    'foreignField': '_id',
                    'as': 'breeds'
                }
            },
            {
                '$lookup': {
                    'from': 'ages',
                    'localField': 'age_id',
                    'foreignField': '_id',
                    'as': 'ages'
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
        const categories = await Category.find({})

        res.status(200).json({
            availableProductDetails: {
                animals,
                categories
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Zwierzatka i kategorie."
        })
    }
}

exports.getAvailableAnimalTypes = async (req, res) => {
    try {
        const animalTypes = await TypeOfAnimals.find({})

        res.status(200).json({
            availableAnimalTypes: {
                animalTypes
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Typy zwierzątek."
        })
    }
}

exports.getAvailableAnimalBreeds = async (req, res) => {
    try {
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
        const unformatedBreeds = animalBreeds.map((animal) => animal.breeds)
        const breedsArray = Array.prototype.concat(...unformatedBreeds)

        const breeds = breedsArray.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === breedsArray.findIndex(obj => {
                return JSON.stringify(obj) === _value;
            });
        });

        res.status(200).json({
            availableAnimalBreeds: {
                breeds
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Typy rasy."
        })
    }
}

exports.getAvailableAnimalAges = async (req, res) => {
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
            availableAnimalAges: {
                ages
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Typy lata."
        })
    }
}

exports.getAvailableAnimalWeights = async (req, res) => {
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
            availableAnimalWeights: {
                weights
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "Typy waga."
        })
    }
}

exports.getAvailableProductsList = async (req, res) => {
    try {
        const product = await Product.find({})

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

exports.getAvailableProduct = async (req, res) => {
    try {
        const productLink = req.query.product_link

        const productDetails = await Product.aggregate([
            {
                '$match': {
                    'link': productLink
                }
            }
        ])
        res.status(200).json({
            availableProduct: {
                productDetails
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}

exports.updatePromotion = async (req, res) => {
    const {sale} = req.body

    Product.findOne({_id: req.body.id}, (err, productSale) => {
        if (sale) {
            productSale.sale = sale;
        }

        productSale.save((err, updatedSales) => {
            if (err) {
                return res.status(400).json({
                    error: 'Aktualizacja profilu nie powiodła się'
                });
            }
            res.status(200).json(updatedSales);
        });
    });
};

exports.getAvailableProductsSaleList = async (req, res) => {
    try {
        const productsSale = await Product.find({})

        res.status(200).json({
            availableProductsSaleList: {
                productsSale
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}
