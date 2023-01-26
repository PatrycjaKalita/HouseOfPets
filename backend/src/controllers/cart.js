const User = require("../models/user");

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
