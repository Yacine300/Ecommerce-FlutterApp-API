const express = require('express');

const app=express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productsRouter = require('./api/routes/products');
const transactionsRouter = require('./api/routes/orders');
const usersRouter = require('./api/routes/user');



app.use('/uploads' ,express.static('uploads'));

mongoose.connect('mongodb+srv://LilEnd:'+process.env.MONGO_ATLAS_PW +'@cluster0.bfkjydw.mongodb.net/?retryWrites=true&w=majority' , {
     
});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/products' , productsRouter);
app.use('/orders' , transactionsRouter);
app.use('/user' , usersRouter )

app.use(morgan('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization' // Corrected header string
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, DELETE, PATCH, GET, POST');
      return res.status(200).json({});
    }
    next();
  });
  



app.use((req , res , next)=>{
    const error = new  Error('Not Found ');
    error.status =404;
    next(error);
});

app.use((error , req ,res , next)=>{

    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message 
        }
    });

});



module.exports = app