const express = require('express');

const ChatRouter = express.Router();

ChatRouter.get('/user', (req, res)=>{
    //console.log(req.user);
    return res.status(200).json({wazzup:"bitches"});
});

module.exports = ChatRouter;