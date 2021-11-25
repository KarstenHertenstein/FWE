import express from 'express';
import bodyParser from 'body-parser';
import JSONdb from 'simple-json-db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const db = new JSONdb('./json_database/entry_db.json');

// Get all entries
router.get('/', (req, res) => {
    //res.send(db.JSON());
    res.send("lable");
})

// Add entry to database
router.post('/', (req, res) => {

    console.log("Writing to database:");
    console.log(req.body);
    var uuid = uuidv4();
    const label = req.body;
    db.set(uuid, {...label, id: uuid})

    // Response from post
    res.send('Successfully written to database!');
})

export default router;