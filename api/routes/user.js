const express = require('express')
const mongoose =require('mongoose')
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../midlleware/check-auth');

router.post('/signup' , (req , res , next)=>{

    User.find({email : req.body.email}).exec().then(user => { // find return an array remember this.
        console.log(user);
        if(user.length >=1){                      // this is not necessair go check user model
            return res.status(409).json({
                message : "email exist"
            });
        }else{
            bcrypt.hash(req.body.password, 10 , (err , hash) =>{
                if(err){
                 res.status(500).json({
                     error : err
                 })
                }else{
                    const user = new User({
                        _id : new  mongoose.Types.ObjectId() ,
                        email : req.body.email,
                        password : hash
                     });
        
                     user.save().then(result => {
                        console.log(result),
                        res.status(200).json({
            message : "User added with success"
                        })
                     }).catch(err => {
                        res.status(500).json({
                            error : err
                        })
                     });
                }
        });
        }
    })
    
 

});

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


  router.delete("/:userId", checkAuth, (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
 



module.exports = router