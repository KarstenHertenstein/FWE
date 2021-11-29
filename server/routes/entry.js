import express from 'express';
import bodyParser from 'body-parser';
import { getEntries, createEntry, getEntryById, getEntryByTitle, deleteEntry, updateEntry } from '../controllers/entry.js';



const router = express.Router();


// Get all entries
router.get('/', getEntries)
// Add entry to database
router.post('/', createEntry)
// route by ID
router.get('/:id', getEntryById)
// route by title
router.get('/title/:title', getEntryByTitle)
// delete entries
router.delete('/:id', deleteEntry)
// update entries
router.patch('/:id', updateEntry)

export default router;
