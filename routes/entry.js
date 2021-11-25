import express from 'express';
import bodyParser from 'body-parser';
import JSONdb from 'simple-json-db';
import { v4 as uuidv4 } from 'uuid';



const router = express.Router();
//const JSONdb = require('simple-json-db');
const db = new JSONdb('./json_database/entry_db.json');


// Get all entries
router.get('/', (req, res) => {
    res.send(db.JSON());
})

// Add entry to database
router.post('/', (req, res) => {

    console.log("Writing to database:");
    console.log(req.body);
    var uuid = uuidv4();
    const entry = req.body;
    db.set(uuid, {...entry, id: uuid})

    // Response from post
    res.send('Successfully written to database!');
})

// route by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    if(db.get(id))
    {
        res.send(db.get(id));
    }
    else
    {
        res.send("The requested resource hasnt been found!");
    }
})



// route by title
router.get('/title/:title', (req, res) => {
    var { title } = req.params;
    var json_obj = db.JSON();
    var Response = [];
    
    for ( var entry in json_obj )
    {
        if(title === json_obj[entry].title)
        {
            Response.push(json_obj[entry]);
        }
    }

    if(Response.length != 0)
    {
        res.send(Response);
    }
    else
    {
        res.send("No entrys found matching the specified title!");
    }
})


// delete entries
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if(db.has(id))
    {
        db.delete(id);
        db.sync();
        res.send('Successfully deleted Entry with ID ${id} !');
    }
    else
    {
        res.send("Entry with ID ${id} not found! Couldnt delete!");
    }

})


export default router;
