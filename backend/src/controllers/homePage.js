const Product = require("../models/product");

exports.getAvailableProductsToBestsellerTable = async (req, res) => {
    try {
        const product = await Product.find({}).limit(6)
        console.log(product)

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
