const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true
        },
        phone_number: {
            type: String,
            trim: true,
            required: true,
            max: 9
        },
        street_and_number: {
            type: String,
            trim: true,
            required: true
        },
        postcode_and_city: {
            type: String,
            trim: true,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        role: {
            type: String,
            default: 'klient'
        },
        resetPasswordLink: {
            data: String,
            default: ''
        },
        cart: {
            products: [{
                amount: Number,
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products'
                },
            }],
            sets: [{
                amount: Number,
                set_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'ProductsSets'
                },
            }],
        }
    },
    {
        timestamps: true
    }
)

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password

        this.salt = this.makeSalt()
        // encryptPassword
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },

    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
}

module.exports = mongoose.model('Users', userSchema)
