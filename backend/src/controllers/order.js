const Order = require("../models/order");
const Product = require("../models/product");
const ProductsSets = require("../models/productsSet")
const User = require("../models/user");

exports.addingOrder = async (req, res) => {
    let {
        totalCost,
        status,
        deliveryMethod,
        deliveryCost,
        paymentMethod,
        paymentCost,
        user,
        products,
        sets,
    } = req.body

    const cartProducts = products.map((product) => {
        return product.product_id
    })

    let items = await Product.find({
        '_id': {'$in': cartProducts}
    })

    products.forEach((product) => {
        items.forEach((item) => {
            if (String(product.product_id) === String(item._id)) {
                item.amount = product.amount
            }
        })
    })

    items.forEach( (product)  => {
        Product.findById(product._id, (error,databaseProduct) =>{
            if(error){
                return error
            }
            databaseProduct.amount = databaseProduct.amount - product.amount
            databaseProduct.save((error, savedProduct) => {
                if(error){
                    return error
                }
            })
        } )
    })

    const cartSets = sets.map((set) => {
        return set.set_id
    })

    let setsItems = await ProductsSets.find({
        '_id': {'$in': cartSets}
    })

    sets.forEach((set) => {
        setsItems.forEach((setItem) => {
            if (String(set.set_id) === String(setItem._id)) {
                setItem.amount = set.amount
            }
        })
    })

    setsItems.forEach( (set)  => {
        ProductsSets.findById(set._id, (error,databaseSet) =>{
            if(error){
                return error
            }
            databaseSet.amount = databaseSet.amount - set.amount
            databaseSet.save((error, savedSet) => {
                if(error){
                    return error
                }
            })
        } )
    })

    let newOrder = new Order({
        totalCost,
        status,
        deliveryMethod,
        deliveryCost,
        paymentMethod,
        paymentCost,
        user,
        products: items,
        sets: setsItems,
    })

    //zapisanie do bazy
    newOrder.save((err, success) => {
        if (err) {
            console.log('Błąd dodawania zamówienia', err)
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: newOrder
        })
    })
}

exports.getAvailableNewOrder = async (req, res) => {
    try {
        const orderID = req.params.id
        /*console.log(orderID)*/

        Order.findById(orderID).exec((err, order) => {
            /*console.log(order)*/

            res.status(200).json({
                availableNewOrder: {
                    order
                }
            })
        })

    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenia nowego zamówienia."
        })
    }
}


exports.getAvailableClientListOfOrders = async (req, res) => {
    try {
        const userEmail = req.params.email

        const orders = await Order.aggregate([
            {
                '$match': {
                    'user.email': userEmail
                }
            }
        ])

        console.log(orders)

        res.status(200).json({
            availableOrdersList: {
                orders
            }
        })

    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenia nowego zamówienia."
        })
    }
}

exports.getAvailableOrder = async (req, res) => {
    try {
        const orderID = req.params.id

        Order.findById(orderID).exec((err, order) => {
            /*console.log(order)*/

            res.status(200).json({
                availableOrder: {
                    order
                }
            })
        })

    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenia nowego zamówienia."
        })
    }
}

exports.getAvailableOrdersList = async (req, res) => {
    try {
        const ordersList = await Order.find({})
        console.log(ordersList)

        res.status(200).json({
            availableOrdersList: {
                ordersList
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "BŁĄD wyswietlenia nowego zamówienia."
        })
    }
}


exports.updateOrderStatus = async (req, res) => {
    const {status} = req.body

    Order.findOne({_id: req.body.id}, (err, orderStatus) => {
        if (status) {
            orderStatus.status = status;
        }

        orderStatus.save((err, updatedStatus) => {
            if (err) {
                return res.status(400).json({
                    error: 'Aktualizacja statusu nie powiodła się'
                });
            }
            res.status(200).json(updatedStatus);
        });
    });
}
