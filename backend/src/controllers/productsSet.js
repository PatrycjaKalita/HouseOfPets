const ProductsSet = require('../models/productsSet')
const mongoose = require("mongoose");
const Animal = require("../models/animal");
const Product = require("../models/product");
const ObjectId = mongoose.Types.ObjectId;

exports.addingProductsSet = async (req, res) => {
    const {
        link,
        name,
        set_code,
        price,
        amount,
        image,
        sale,
        category_id,
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id,
        products_id,
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
    let animal_id = result[0]._id;

    let newProductsSet = new ProductsSet({
        link,
        name,
        set_code,
        price,
        amount,
        image,
        sale,
        category_id,
        animal_id,
        products_id
    })

    //zapisanie do bazy
    newProductsSet.save((err, success) => {
        if (err) {
            console.log('Błąd dodawania zestawu', err)
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Zestaw dodany!'
        })
    })
}

exports.getAvailableProductsSetList = async (req, res) => {
    try {
        const productsSet = await ProductsSet.find({})

        res.status(200).json({
            availableProductsSetList: {
                productsSet
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}

exports.getAvailableProductsSet = async (req, res) => {
    try {
        const productsSetLink = req.query.products_set_link

        const productsSet = await ProductsSet.aggregate([
            {
                '$match': {
                    'link': productsSetLink
                },
            },
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'products_id',
                    'foreignField': '_id',
                    'as': 'products'
                }
            }
        ])
        res.status(200).json({
            availableProductsSet: {
                productsSet
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

    ProductsSet.findOne({_id: req.body.id}, (err, productsSetSale) => {
        if (sale) {
            productsSetSale.sale = sale;
        }

        productsSetSale.save((err, updatedSales) => {
            if (err) {
                return res.status(400).json({
                    error: 'Aktualizacja profilu nie powiodła się'
                });
            }
            res.status(200).json(updatedSales);
        });
    });
};

exports.deleteProductsSet = async (req, res) => {
    ProductsSet.findOne({_id: req.body.id}, (err, set) => {

        set.delete((err, deleteSet) => {
            if (err) {
                return res.status(400).json({
                    error: 'Zestaw usunięty.'
                });
            }
            res.status(200).json(deleteSet);
        });
    });
}


exports.updateSet = async (req, res) => {
    const {
        name,
        price,
        amount,
        image,
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id,
        products_id,
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

    console.log(products_id)

    ProductsSet.findOne({_id: req.body.id}, (err, set) => {
        if (name) {
            set.name = name;
        }

        if (price) {
            set.price = price;
        }

        if (amount) {
            set.amount = amount;
        }

        if (image) {
            set.image = image;
        }

        if(products_id.length !== 0){
            set.products_id = products_id
        }

        let animal_id = result[0]._id;
        if (animal_id) {
            set.animal_id = animal_id;
        }

        set.save((err, updatedSet) => {
            if (err) {
                return res.status(400).json({
                    error: 'Aktualizacja zestawu nie powiodła się'
                });
            }
            res.status(200).json(updatedSet);
        });
    });
}

exports.getAvailableProductsSetDetailsForUpdate = async (req, res) => {
    try {
        const productsSetID = req.query.products_set_id

        const productsSet = await ProductsSet.aggregate([
            {
                '$match': {
                    '_id': ObjectId(productsSetID)
                },
            },
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'products_id',
                    'foreignField': '_id',
                    'as': 'products'
                }
            },
        ])

        res.status(200).json({
            availableProductsSet: {
                productsSet
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}

exports.updateDeliveryForSet = async (req, res) => {
    const {amount} = req.body

    ProductsSet.findOne({_id: req.body.id}, (err, delivery) => {
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
