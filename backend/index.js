const { configDotenv } = require('dotenv');
const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
configDotenv({path:'./.env'});
const DB_URL = process.env.DB_URL;

app.get('/', (req,res)=>{
    return res.send("Hallo");
})

mongoose.connect(DB_URL).then(()=>{
    console.log('DB Connected');
    app.listen(port, ()=>{
        console.log('Server up');
    });
}).catch((error)=>{
    console.log(error);
})