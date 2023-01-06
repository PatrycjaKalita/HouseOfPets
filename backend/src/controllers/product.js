const Product = require('../models/product')
const mongoose = require("mongoose");



exports.addingProduct = (req, res) => {
    const {link, name, producer, price, amount, expiration_date, weight, color, image, product_code, animals_id, categories_id, descriptions_id, compositions_id, analytical_components_id, dosage_id} = req.body

    Product.findOne({link}).exec((err, product) => {
        if (product) {
            return res.status(400).json({
                error: 'Link jest już zajęty'
            })
        }
    })

    let newProduct = new Product({link, name, producer, price, amount, expiration_date, weight, color, image, product_code, animals_id, categories_id, descriptions_id, compositions_id, analytical_components_id, dosage_id})

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
