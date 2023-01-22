const Product = require('../models/product')
const Animal = require('../models/animal')
const ProductsSet = require('../models/productsSet')
const Category = require('../models/category')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addingProductsSet = async (req, res) => {
    const {
        link,
        name,
        price,
        set_code,
        sale,
        image,
        animal_id,
        products_id,
        category_id,
    } = req.body

    console.log(req.body)
    let newProductsSet = new ProductsSet({
        link,
        name,
        price,
        sale,
        image,
        set_code,
        animal_id,
        products_id,
        category_id,
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
