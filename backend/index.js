const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req,res)=>{
    return res.send("Hallo");
})

app.listen(port, ()=>{
    console.log('Server up');
});