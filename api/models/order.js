const mongoose = require('mongoose') ; 
const Product = require('../models/product');

const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    orderProduit : {type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' , required : true },]}, 
    total : {type : Number , required : true , default : 0.0},
    createdAt: { type: Date, default: Date.now },


})

module.exports = mongoose.model('Order' , orderSchema);