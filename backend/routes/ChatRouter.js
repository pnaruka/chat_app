const express = require('express');

const ChatRouter = express.Router();

ChatRouter.get('/get/:id');

module.exports = ChatRouter;