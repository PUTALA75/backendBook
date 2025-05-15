const BooksData = require('../models/bookmodel')


const getBooks=async(req,res)=>{
     try {
        const pro=await BooksData.find({})
        res.status(200).json(pro)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

}

const getBookId=async(req,res)=>{
    try {
        const {id}=req.params;
        const pro=await BooksData.findById(id)
        res.status(200).json(pro)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

}

const createBook=async(req,res)=>{
       try {
        const item=await BooksData.create(req.body)
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}


const updateBook=async(req,res)=>{
    try {
        const {id}=req.params;

        const pro=await BooksData.findByIdAndUpdate(id,req.body);

        if(!pro){
            return res.status(404).json({message:"Book not found"})
        }
        const updatedBook= await BooksData.findById(id)
        res.status(200).json({updatedBook});

    } catch (error) {
         res.status(500).json({message:error.message})
        
    }
}


const deleteBook=async(req,res)=>{
    try {
        const {id}=req.params;

        const pro=await BooksData.findByIdAndDelete(id)

        if(!pro){
            return res.status(404).json({message:"Book not found"})

        }
        res.status(200).json({message:"Book delete Successfully"})
    } catch (error) {
         res.status(500).json({message:error.message})
        
    }
}


module.exports={
    getBooks,getBookId,createBook,updateBook,deleteBook
}