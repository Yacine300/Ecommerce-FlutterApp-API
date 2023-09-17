const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');


router.post('/' , (req , res , next)=>{
   const order = new Order({
    _id : new mongoose.Types.ObjectId(),
    createdAt : new Date(),
    orderProduit: req.body.orderProduit ,
    total : req.body.total,
   })

   order.save().then(result => {
    console.log(result);
    res.status(201).json({
        message : "transaction created with success" , 
        order : result ,
    })
   }).catch(error => {
    res.status(500).json(error)
   })
    
    })

router.get('/' , (req , res , next)=>{
     Order.find().select('_id createdAt orderProduit total').populate('orderProduit').exec().then(result => {
        
        console.log(result);
        
       if(result.length >=0) {
        res.status(200).json({
            result : result
        })
       }else{
        res.status(404).json({
            error_message : "No elemnt found"
        })
       }
       }).catch(error => {
        res.status(500).json(error)
       })

})



router.delete('/:orderID', (req, res, next) => {
  const orderID = req.params.orderID;
  Order.deleteOne({ _id: orderID })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});




module.exports = router