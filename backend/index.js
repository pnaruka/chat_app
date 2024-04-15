const { configDotenv } = require('dotenv');
const express = require('express');
const { default: mongoose } = require('mongoose');
const UserRouter = require('./routes/UserRouter');
const ChatRouter = require('./routes/ChatRouter');
const requireAuth = require('./middlewares/requireAuth');
const { notFound, errorHandler } = require('./middlewares/errorHandlers');
const cors = require('cors');
const MessageRouter = require('./routes/MessageRouter');

configDotenv({path:'./.env'});
const port = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;


const app = express();
app.use(cors());
app.use(express.json());
app.use('/user',UserRouter);
app.use(requireAuth);
app.use('/chat', ChatRouter);
app.use('/message', MessageRouter);

app.get('/', (req,res)=>{
    return res.send("Hallo");
})

app.use(notFound);
app.use(errorHandler);

mongoose.connect(DB_URL).then(()=>{
    console.log('DB Connected');
    app.listen(port, ()=>{
        console.log(`Server up at ${port}`);
    });
}).catch((error)=>{
    console.log(error);
})