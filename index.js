const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

//Midd-wares
app.use(express.static('public/'));

//Routes
app.get('/api/',(req,res)  => {
    res.send('HI FROM API!');
})

app.get('/api/auth/', async (req,res) => {
    if(req.params.code){
        res.send(req.params.code);
    }

    if(!process.env.FB_USER_AUTH_SECRET){
        res.sendStatus(404);   
    }
    try{
        const result = await axios.get(`https://graph.instagram.com/me?fields=username&access_token=${process.env.FB_USER_AUTH_SECRET}`);
        res.json(result.data);
    }
    catch(err){
        console.error(err)
        res.sendStatus(301);
    }
})

app.get('/*', (req,res) => {
    res.sendStatus(404);
})

//process section
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => {
    console.log('Server up and running on ->', `http://localhost:${PORT}`);
})