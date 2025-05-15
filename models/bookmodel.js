const mongoose = require("mongoose");

const BookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishedYear:{
        type:Date,
        required:true
    }
    
})

const BooksData=mongoose.model("book",BookSchema)

module.exports=BooksData;