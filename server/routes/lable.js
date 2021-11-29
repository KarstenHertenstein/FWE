import express from 'express';
import bodyParser from 'body-parser';
import JSONdb from 'simple-json-db';
import { v4 as uuidv4 } from 'uuid';
import { getAllLables, createLable, updateLable, deleteLable, getLableById } from '../controllers/lable.js';

const router = express.Router();
const db = new JSONdb('./json_database/entry_db.json');

// Get all Lables
router.get('/', getAllLables)

// Add entry to database
router.post('/', createLable)

// Get lable by ID
router.get('/:id', getLableById)

// Update lable
router.patch('/:id', updateLable)

// Delete a lable
router.delete('/:id', deleteLable)



export default router;