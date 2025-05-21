/*const BooksData = require('../models/bookmodel')


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
*/
const BooksData = require('../models/bookModel');

const getBooks = async (req, res) => {
  try {
    const books = await BooksData.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookId = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BooksData.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = await BooksData.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await BooksData.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BooksData.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookId,
  createBook,
  updateBook,
  deleteBook
};
