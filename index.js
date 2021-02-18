const express = require('express');
const app = express();


//Midd-wares

//Routes
app.get('/api/',(req,res)  => {
    res.send('HI FROM API!');
})


//Process
const PORT = process.env.PROD_PORT || 3000;
app.listen(PORT, () => {
    console.log('Server up and running on ->', PORT);
})