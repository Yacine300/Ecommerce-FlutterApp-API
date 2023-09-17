const mongoose  = require ('mongoose');

 const productSchema = mongoose.Schema({
      _id : mongoose.Schema.Types.ObjectId ,
      productName : {type : String , required : true},
      productDescreption : {type : String , required : true},
      productType : {type : String , required : true},
      productPrice : {type : Number , required : true},
      productRating : {type : Number , required : true},
      productImages : {type : [String] , required : true},
      productColors : {type : [String] , required : true},
      produstLicked : {type : Boolean},

 })

 module.exports = mongoose.model('Product' , productSchema);
