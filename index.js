const express = require('express');

const app = express();
require('dotenv').config();

app.use(express.static('public/'));
//Midd-wares

//Routes
app.get('/api/',(req,res)  => {
    res.send('HI FROM API!');
})


app.get('/*', (req,res) => {
    res.sendStatus(404);
})

//Process
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => {
    console.log('Server up and running on ->', `http://localhost:${PORT}`);
})