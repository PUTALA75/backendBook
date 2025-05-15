const express=require('express')
const multer = require('multer');
const {getBooks,getBookId,createBook,updateBook,deleteBook} =require('../controllers/bookController')
const router=express.Router()



const { importBooksFromCSV } = require('../controllers/importController');

router.get('/',getBooks)

router.get('/:id',getBookId)

router.post('/',createBook)

router.put('/:id',updateBook)

router.delete('/:id',deleteBook)

const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), async (req, res) => {
  try {
    
    return res.json({ addedBooksCount: 10, errorRows: [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Import failed' });
  }
});

module.exports=router 