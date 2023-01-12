const {check} = require('express-validator')

exports.addingProductValidator = [
/*    check('link').not().isEmpty().withMessage('Link jest wymagany'),*/
    check('name').not().isEmpty().withMessage('Nazwa produktu jest wymagana'),
    check('producer').not().isEmpty().withMessage('Producent produktu jest wymagany'),
    check('price').not().isEmpty().withMessage('Cena jest wymagana'),
    check('amount').not().isEmpty().withMessage('Numer telefonu jest nie kompletny'),
/*    check('product_code').isLength({min: 6}).withMessage('Kod produktu musi zawierać min. 6 cyfr'),*/
]
