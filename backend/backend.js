const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require("dotenv").config()

const app = express()

//conect to db
mongoose
    .connect(process.env.DATABASE, {})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));

//import routes
const cartRoutes = require('./src/routes/cart')
const productsListRoutes = require('./src/routes/productsList')
const productRoutes = require('./src/routes/product')
const productsSetRoutes = require('./src/routes/productsSet')
const authRoutes = require('./src/routes/auth')
const userRoutes = require('./src/routes/user')
const animalRoutes = require('./src/routes/animal')
const shopFormRoutes = require('./src/routes/shopForm')

app.use(morgan('dev'))
app.use(bodyParser.json())

//app.use(cors()) //allows all origins
if (process.env.NODE_ENV === 'development') {
    // place where frontend is running
    app.use(cors({origin: `http://localhost:3000`}))
}

//middleware
app.use('/api', cartRoutes)
app.use('/api', productsListRoutes)
app.use('/api', shopFormRoutes)
app.use('/api', productsSetRoutes)
app.use('/api', productRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', animalRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})
