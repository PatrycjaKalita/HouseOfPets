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
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id,
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

    let result;
    result = await Animal.aggregate([
        {
            '$lookup': {
                'from': 'animals',
                'localField': 'animal_id',
                'foreignField': '_id',
                'as': 'animals'
            }
        }
    ])

    if (type_of_pets_id !== '') {
        result = result.filter(animal => type_of_pets_id === String(animal.type_of_pets_id))
    }

    if (breed_id === '') {
        result = result.filter(animal => animal.breed_id === undefined)
    } else {
        result = result.filter(animal => breed_id === String(animal.breed_id))

        if (age_id !== '') {
            result = result.filter(animal => age_id === String(animal.age_id))

            if (weight_id !== '') {
                result = result.filter(animal => weight_id === String(animal.weight_id))
            }
        }
    }
    console.log('result: ', result)

    let animal_id = result[0]._id;

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

exports.deleteProductFromShop = async (req, res) => {
    Product.findOne({_id: req.body.id}, (err, product) => {

        product.delete((err, deleteProduct) => {
            if (err) {
                return res.status(400).json({
                    error: 'Produkt usunięty.'
                });
            }
            res.status(200).json(deleteProduct);
        });
    });
}

exports.getAvailableProductToEdit = async (req, res) => {
    try {
        const productID = req.query.product_id

        const productDetails = await Product.aggregate([
            {
                '$match': {
                    '_id': ObjectId(productID)
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
            error: "BŁĄD: wyswietlenie produktu w oknie edycji."
        })
    }
}


exports.updateProductDetails = async (req, res) => {
    const {
        name,
        producer,
        price,
        amount,
        expiration_date,
        weight,
        color,
        image,
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
        low_needs,
        category_id,
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id,
    } = req.body

    let result = await Animal.aggregate([
        {
            '$lookup': {
                'from': 'animals',
                'localField': 'animal_id',
                'foreignField': '_id',
                'as': 'animals'
            }
        }
    ])

    if (type_of_pets_id !== '') {
        result = result.filter(animal => type_of_pets_id === String(animal.type_of_pets_id))
    }

    if (breed_id === '') {
        result = result.filter(animal => animal.breed_id === undefined)
    } else {
        result = result.filter(animal => breed_id === String(animal.breed_id))

        if (age_id !== '') {
            result = result.filter(animal => age_id === String(animal.age_id))

            if (weight_id !== '') {
                result = result.filter(animal => weight_id === String(animal.weight_id))
            }
        }
    }

    Product.findOne({_id: req.body.id}, (err, product) => {
        if (name) {
            product.name = name;
        }
        if (producer) {
            product.producer = producer;
        }
        if (price) {
            product.price = price;
        }
        if (amount) {
            product.amount = amount;
        }
        if (expiration_date) {
            product.expiration_date = expiration_date;
        }
        if (weight) {
            product.weight = weight;
        }
        if (color) {
            product.color = color;
        }
        if (image) {
            product.image = image;
        }
        if (description) {
            product.description = description;
        }
        if (extra_description) {
            product.extra_description = extra_description;
        }
        if (image_description) {
            product.image_description = image_description;
        }
        if (composition) {
            product.composition = composition;
        }
        if (additives) {
            product.additives = additives;
        }
        if (protein) {
            product.protein = protein;
        }
        if (fat) {
            product.fat = fat;
        }
        if (ash) {
            product.ash = ash;
        }
        if (fiber) {
            product.fiber = fiber;
        }
        if (body_weight) {
            product.body_weight = body_weight;
        }
        if (moderate_needs) {
            product.moderate_needs = moderate_needs;
        }
        if (low_needs) {
            product.low_needs = low_needs;
        }
        if (category_id) {
            product.category_id = category_id;
        }

        let animal_id = result[0]._id;
        if (animal_id) {
            product.animal_id = animal_id;
        }

        product.save((err, updatedProductDetails) => {
            if (err) {
                return res.status(400).json({
                    error: 'Aktualizacja produktu nie powiodła się'
                });
            }
            res.status(200).json(updatedProductDetails);
        });
    });
}

exports.updateDelivery = async (req, res) => {
    const {amount} = req.body

    Product.findOne({_id: req.body.id}, (err, delivery) => {
        if (amount) {
            delivery.amount = amount;
        }

        delivery.save((err, updateDelivery) => {
            if (err) {
                return res.status(400).json({
                    error: 'Aktualizacja dostawy nie powiodła się'
                });
            }
            res.status(200).json(updateDelivery);
        });
    });
};
