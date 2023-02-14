const {check} = require('express-validator')

exports.addingProductValidator = [
    check('name').not().isEmpty().withMessage('Nazwa produktu jest wymagana'),
    check('producer').not().isEmpty().withMessage('Producent produktu jest wymagany'),
    check('price').not().isEmpty().withMessage('Cena jest wymagana'),
    check('amount').not().isEmpty().withMessage('Numer telefonu jest nie kompletny'),
    check('description').not().isEmpty().withMessage('Opis jest wymagany'),
    check('composition').not().isEmpty().withMessage('Skład jest wymagany'),
]
