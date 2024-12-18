const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        id:{type:Number, required:true},
        category:{type:String, required:true},
        name:{type:String, required:true},
        description:{type:String, required:true},
        price:{type:Number, required:true},
        img:{type:String, required:true},
       
        
    },
    {timestamps:true}
);


const Product = mongoose.model("Product,",ProductSchema);
module.exports = Product;
