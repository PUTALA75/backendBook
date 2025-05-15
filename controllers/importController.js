const fs = require('fs');
const csv = require('csv-parser');
const BooksData = require('../models/bookmodel');

const importBooksFromCSV = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'CSV file is required' });

    const results = [];
    const errorRows = [];
    let rowIndex = 1;

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (row) => {
            const { title, author, publishedYear } = row;
            const errors = [];

            if (!title || typeof title !== 'string') errors.push('Missing or invalid title');
            if (!author || typeof author !== 'string') errors.push('Missing or invalid author');
            if (!publishedYear || isNaN(Number(publishedYear))) errors.push('Invalid published year');

            if (errors.length > 0) {
                errorRows.push(`Row ${rowIndex}: ${errors.join(', ')}`);
            } else {
                results.push({
                    title: title.trim(),
                    author: author.trim(),
                    publishedYear: new Date(Number(publishedYear), 0, 1)
                });
            }
            rowIndex++;
        })
        .on('end', async () => {
            try {
                if (results.length > 0) {
                    await BooksData.insertMany(results);
                }
                fs.unlinkSync(req.file.path);
                res.status(200).json({
                    addedBooksCount: results.length,
                    errorRows
                });
            } catch (error) {
                res.status(500).json({ message: 'Internal Server Error', error: error.message });
            }
        })
        .on('error', (error) => {
            res.status(500).json({ message: 'CSV Parsing Error', error: error.message });
        });
};


module.exports = { importBooksFromCSV };
