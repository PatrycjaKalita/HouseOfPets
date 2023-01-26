const User = require("../models/user");
const Product = require("../models/product");
const Animal = require("../models/animal");

exports.updateCart = (req, res) => {
    const cart = req.body.cart

    console.log(req.body.cart)
    console.log(req.user._id)

    User.findOne({_id: req.user._id}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Użytkownik nie został znaleziony'
            });
        }

        if (cart) {
            user.cart = cart;
        }
        console.log(cart)

        user.save((err, updatedUser) => {
            if (err) {
                return res.status(400).json({
                    error: 'Aktualizacja profilu nie powiodła się'
                });
            }

            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;

            res.status(200).json(updatedUser);
        });
    });
};

exports.getAvailableCart = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        const cartProducts = user.cart.products.map((product) => {
            return product.product_id
        })

        let products = await Product.find({
            '_id': {'$in': cartProducts}
        })

        user.cart.products.forEach((product) => {
            products.forEach((item) => {
                if (String(product.product_id) === String(item._id)) {
                    item.amount = product.amount
                }
            })
        })

        res.status(200).json({
            availableItemsInCart: {
                products
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}
