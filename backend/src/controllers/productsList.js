const Category = require("../models/category");

exports.getAvailableCategoryDetails = async (req, res) => {
    try {
        const details = await Category.find({})

        res.status(200).json({
            availableCategoriesDetails: {
                details
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "kategorie detale"
        })
    }
}
