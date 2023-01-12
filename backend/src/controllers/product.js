const Product = require('../models/product')
const Animal = require('../models/animal')
const Category = require('../models/category')
const Description = require('../models/description')
const Composition = require('../models/composition')
const AnalyticalComponents = require('../models/analyticalComponent')
const Dosage = require('../models/dosage')
const mongoose = require("mongoose");

exports.addingProduct = (req, res) => {
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
         animal_id,
         category_id,
        // description_id,
        // composition_id,
        // analytical_component_id,
        // dosage_id
    } = req.body

/*    const product = req.body.product

    Product.findOne({link: product.link}).exec((err, product) => {
        if (product) {
            return res.status(400).json({
                error: 'Link jest już zajęty'
            })
        }
    })*/

    let newProduct = new Product({
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
     animal_id,
        category_id,
  /*         description_id,
        composition_id,
        analytical_component_id,
        dosage_id*/
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

exports.getAvailableProductDetails = async (req, res) =>{
    try{
        const animals = await Animal.aggregate([
            {
                '$lookup': {
                    'from':'typeofanimal',
                    'localField': 'type_of_pets_id',
                    'foreignField': '_id',
                    'as': 'typeofanimal'
                }
            },
            {
                '$lookup': {
                    'from':'breeds',
                    'localField': 'breed_id',
                    'foreignField': '_id',
                    'as': 'breeds'
                }
            },
            {
                '$lookup': {
                    'from':'age',
                    'localField': 'age_id',
                    'foreignField': '_id',
                    'as': 'age'
                }
            },
            {
                '$lookup': {
                    'from':'weight',
                    'localField': 'weight_id',
                    'foreignField': '_id',
                    'as': 'weight'
                }
            }
        ])
        console.log(animals)
        const categories = await Category.find({})



        /*console.log(categories)*/

        res.status(200).json({
            availableProductDetails: {
                animals,
                categories
            }
        })
    } catch (error){
        res.status(404).json({
            error: "Zwierzatka i kategorie."
        })
    }

}

exports.addingProductDetails = (req, res) => {


}
