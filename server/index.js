import express from 'express';
import bodyParser from 'body-parser';
import entries from './routes/entry.js'
import lables from './routes/lable.js'

const app = express();
const PORT = 8080;



app.use(bodyParser.json());
// Starting path
app.use('/entry', entries);
app.use('/lable', lables);

app.get('/', (req, res) => {
    res.send("Default Route '/' requested");
});



app.listen(PORT, () => console.log('Server Running on port: http://localhost:${PORT}'));