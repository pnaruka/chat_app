const { configDotenv } = require('dotenv');
const express = require('express');
const { default: mongoose } = require('mongoose');
const UserRouter = require('./routes/UserRouter');

configDotenv({path:'./.env'});
const port = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;


const app = express();
app.use('/user',UserRouter);

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