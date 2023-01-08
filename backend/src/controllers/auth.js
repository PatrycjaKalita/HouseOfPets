const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    const {login, name, lastname, email, phone_number, street_and_number, postcode_and_city, password} = req.body

    User.findOne({email, login}).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Login lub mail jest zajęty'
            })
        }
    })

    let newUser = new User({login, name, lastname, email, phone_number, street_and_number, postcode_and_city, password})

    //zapisanie do bazy
    newUser.save((err, success) => {
        if (err) {
            console.log('SIGNUP ERROR', err)
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Rejestracja pomyślna!'
        })
    })
}

exports.signin = (req, res) => {
    const {login, password} = req.body

    User.findOne({login}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Użytkownik z tym loginem nie istneje. Proszę zarejestruj się.'
            })
        }

        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Login lub hasło nie pasuje.'
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        const {_id, login, name, lastname, email, phone_number, street_and_number, postcode_and_city, role} = user

        return res.json({
            token,
            user: {_id, login, name, lastname, email, phone_number, street_and_number, postcode_and_city, role}
        })
    })
}

exports.requireSignin = (req, res, next) => {
    const auth = req.headers['authorization'];

    if (auth && auth.split(' ')[1] === undefined) return res.status(401).json({
        error: 'Brak JWT'
    });

    jwt.verify(auth && auth.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({
            error: 'Invalid or expired JWT'
        });

        req.user = user;
        next();
    });
};

exports.adminMiddleware = (req, res, next) => {
    User.findById({ _id: req.user._id }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Użytkownik nie istnieje'
            });
        }

        if (user.role !== 'pracownik') {
            return res.status(400).json({
                error: 'Dostęp odmówiony.'
            });
        }

        req.profile = user;
        next();
    });
};
