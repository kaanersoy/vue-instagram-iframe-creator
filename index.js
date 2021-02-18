const express = require('express');

const app = express();
require('dotenv').config()
//Midd-wares

//Routes
app.get('/api/',(req,res)  => {
    res.send('HI FROM API!');
})


app.get('/*', (req,res) => {
    res.sendStatus(404);
})

//Process
const PORT = process.env.PROD_PORT || 3000;
app.listen(PORT, () => {
    console.log('Server up and running on ->', `http://localhost:${PORT}`);
})