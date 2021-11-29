import { v4 as uuidv4 } from 'uuid';
import JSONdb from 'simple-json-db';
const db = new JSONdb('./json_database/lable_db.json');

export const getAllLables = (req, res) => {
    res.send(db.JSON());
}

export const getLableById = (req, res) => {
    const { id } = req.params;
    if(db.has(id))
    {
        res.send(db.get(id));
    }
    else
    {
        res.send("No lable found matching that ID!");
    }
}

export const createLable = (req, res) => {

    console.log("Writing lable to database:");
    console.log(req.body);
    var uuid = uuidv4();
    const label = req.body;
    db.set(uuid, {...label, id: uuid})

    // Response from post
    res.send('Successfully written to database!');
}

export const updateLable = (req, res) => {

    const { id } = req.params;
    const {name} = req.body;

    if(db.has(id))
    {
        var lable = db.get(id);
        if(name)
        {
            lable.name = name;
        }

        db.set(id, lable);
        db.sync();
    }
    else
    {
        res.send("No Lable with that id found!");
    }

}

export const deleteLable = (req, res) => {
    const { id } = req.params;

    if(db.has(id))
    {
        db.delete(id);
        db.sync();
        res.send("Successfully deleted lable!");
    }
    else
    {
        res.send("No lable found matching that ID!");    
    }
}