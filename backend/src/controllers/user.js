const User = require('../models/user')
const AnimalForAdoption = require("../models/animalForAdoption");

exports.read = (req, res) => {
    const userId = req.params.id

    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(404).json({
                error: 'Użytkownik nie został znaleziony'
            })
        }

        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    })
}

exports.update = (req, res) => {
/*    console.log('Update - req.user', req.user, 'Update data', req.body)*/
    const {login, name, lastname, email, phone_number, street_and_number, postcode_and_city, password} = req.body

    User.findOne({_id: req.user._id}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Użytkownik nie został znaleziony'
            });
        }

        if (login) {
            user.login = login;
        } else if (!login) {
            return res.status(400).json({
                error: "Login jest wymagany"
            });
        }

        if (name) {
            user.name = name;
        } else if (!name) {
            return res.status(400).json({
                error: "Imię jest wymagane"
            });
        }

        if (lastname) {
            user.lastname = lastname;
        } else if (!lastname) {
            return res.status(400).json({
                error: "Nazwisko jest wymagane"
            });
        }

        if (email) {
            user.email = email;
        } else if (!email) {
            return res.status(400).json({
                error: "Email jest wymagany"
            });
        }

        if (phone_number) {
            if (phone_number.length < 9 || phone_number.length > 9) {
                return res.status(400).json({
                    error: 'Numer telefonu musi mieć 9 cyferek'
                });
            } else {
                user.phone_number = phone_number;
            }
        }

        if (street_and_number) {
            user.street_and_number = street_and_number;
        } else if (!street_and_number) {
            return res.status(400).json({
                error: "Ulica i numer domu/mieszkania jest wymagane"
            });
        }

        if (postcode_and_city) {
            user.postcode_and_city = postcode_and_city;
        } else if (!postcode_and_city) {
            return res.status(400).json({
                error: "Kod pocztowy i Miasto jest wymagane"
            });
        }

        if (password) {
            if (password.length < 8) {
                return res.status(400).json({
                    error: 'Hasło musi zawierać min.8 znaków'
                });
            } else {
                user.password = password;
            }
        }

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

exports.getAvailableUsersList = async(req, res) => {
    try {
        const user = await User.find({})

        res.status(200).json({
            availableUsersList: {
                user
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenie listy produktow."
        })
    }
}

exports.deleteUser= async (req, res) => {
    User.findOne({_id: req.body.id}, (err, user) => {

        user.delete((err, deleteUser) => {
            if (err) {
                return res.status(400).json({
                    error: 'Użytkownik usunięty.'
                });
            }
            res.status(200).json(deleteUser);
        });
    });
}
