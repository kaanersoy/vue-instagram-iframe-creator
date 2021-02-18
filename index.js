const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const app = express();
require('dotenv').config();

//Midd-wares
app.use(express.static('public/'));
app.use(helmet({
    contentSecurityPolicy: false
}))
//Routes
app.get('/api/',(req,res)  => {
    res.send('HI FROM API!');
})

app.get('/api/auth/', async (req,res) => {
    const {FB_APP_ID, FB_API_SECRET_KEY, APP_AUTH_URL} = process.env;
    if(req.query.code){
        const params = new URLSearchParams();
        params.append('client_id', FB_APP_ID);
        params.append('client_secret', FB_API_SECRET_KEY);
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', APP_AUTH_URL);
        params.append('code', req.query.code);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        try{    
            const result = await axios.post('https://api.instagram.com/oauth/access_token/', params, config);
            res.send({
                data: result.data,
                result: 'Result is that!'
            });
        }catch(err){
            res.send(err);
        }
    }
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${FB_APP_ID}&redirect_uri=${APP_AUTH_URL}&scope=user_profile,user_media&response_type=code`;
    res.redirect(authUrl);
})

app.get('/*', (req,res) => {
    res.sendStatus(404);
})

//process section
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => {
    console.log('Server up and running on ->', `http://localhost:${PORT}`);
})