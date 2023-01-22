const {check} = require('express-validator')

exports.addingAnimalForAdoptionValidator = [
    check('name').not().isEmpty().withMessage('Musi być podabe imię zwierzątka.'),
    check('short_description').not().isEmpty().withMessage('Opis jest wymagany!'),
    check('email').isEmail().withMessage('Email nie jest poprawny.'),
    check('phone_number').isLength({min: 9, max: 9}).withMessage('Numer telefonu jest błędny!'),
]
