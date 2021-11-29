import { v4 as uuidv4 } from 'uuid';
import JSONdb from 'simple-json-db';
const db = new JSONdb('./json_database/entry_db.json');


export const getEntries = (req, res) => {
    res.send(db.JSON());
}

export const createEntry = (req, res) => {

    console.log("Writing to database:");
    console.log(req.body);
    var uuid = uuidv4();
    const entry = req.body;
    db.set(uuid, {...entry, id: uuid})

    // Response from post
    res.send('Successfully written to database!');
}

export const getEntryById = (req, res) => {
    const { id } = req.params;
    if(db.get(id))
    {
        res.send(db.get(id));
    }
    else
    {
        res.send("The requested resource hasnt been found!");
    }
}

export const getEntryByTitle = (req, res) => {
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
}

export const deleteEntry = (req, res) => {
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
}

export const updateEntry = (req, res) => {
    const { id } = req.params;
    const {title, category, date} = req.body;

    // If we found matching database entry
    if(db.has(id))
    {
        var entry = db.get(id);
        if(title)
        {
            entry.title = title;
        }
        if(category)
        {
            entry.category = category;
        }
        if(date)
        {
            entry.date = date;
        }
        db.set(entry.id, entry);
        db.sync();

        res.send("Successfully changed Diary-Entry!");
    }
    // No database entry found
    else
    {
        res.send('No matching entry to update found!');
    }


    
}