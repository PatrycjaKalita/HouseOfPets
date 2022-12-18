const {check} = require('express-validator')

exports.userSignupValidator = [
    check('login').not().isEmpty().withMessage('Login jest wymagany'),
    check('name').not().isEmpty().withMessage('Imię jest wymagane'),
    check('lastname').not().isEmpty().withMessage('Nazwisko jest wymagane'),
    check('email').isEmail().withMessage('Email jest nie poprawny'),
    check('phone_number').isLength({min: 9, max: 9}).withMessage('Numer telefonu jest nie kompletny'),
    check('street_and_number').not().isEmpty().withMessage('Ulica i numer domu/mieszkania jest wymagane'),
    check('postcode_and_city').not().isEmpty().withMessage('Kod pocztowy i Miasto jest wymagane'),
    check('password').isLength({min: 8}).withMessage('Hasło musi zawierać min.8 znaków')
]

exports.userSigninValidator = [
    check('login').not().isEmpty().withMessage('Login jest wymagany'),
    check('password').isLength({min: 8}).withMessage('Hasło musi zawierać min.8 znaków')
]
