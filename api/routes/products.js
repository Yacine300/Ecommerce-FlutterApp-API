const express = require('express');
const router = express.Router();

const multer = require('multer');
// set a destination to a static folder , also a custom file to avois collision
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads/');
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
   }
});

// select wich file extention is accepted
const fileFilter = (req , file, cb) => {
    if(file.mymetype === "image/jpg" || file.mymetype === "image/jpeg" || file.mymetype === "image/png" || file.mymetype === "image/jfif" ){
        cb(null , true );
    }else{
        cb (null , false);
    }


}
//fileFilter : fileFilter
const upload = (multer({storage : storage}));

const mongoose = require('mongoose');
const Product = require('../models/product');



router.post('/', upload.array('productImages' , 3) , (req , res , next)=>{
    console.log(req.files);
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        productName : req.body.productName,
        productPrice : req.body.productPrice,
        productLicked : req.body.productLicked,
        productDescreption : req.body.productDescreption,
        productType : req.body.productType,
        productRating : req.body.productRating,
        productImages : req.body.productImages ? req.body.productImages.split(',') : [],
        productColors: req.body.productColors ? req.body.productColors.split(',') : []
    })
    product.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message : "product created" ,
            product : product
        })

    }).catch(err => {
        console.log(err),
        res.status(500).json({
           
            error : err
        })

    });
   
})

router.get('/', (req , res , next ) => {
    
    Product.find().exec().then(result => {
        console.log(result);
       if(result.length>=0) {
        res.status(200).json({
            result : result
        })
       }else{
        res.status(404).json({
            error_message : "No Element Found"
        })
       }
       })
});

router.get('/:productId', (req , res , next ) => {
   const id = req.params.productId;
   
   Product.findById(id).exec().then(result => {
    console.log(result);
    if(result.length >=0) {
    res.status(200).json({
        result : result
    })
   }else{
    res.status(404).json({
        error_message : "Element Not Found"
    })
   }
   })
    
   .catch(error => {
    console.log(error);
    res.status(500).json({
        error : error
    })
   })
});

module.exports = router;