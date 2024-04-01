const express = require('express');
const { createChat, getAllChats } = require('../controllers/chatControllers');

const ChatRouter = express.Router();

ChatRouter.post('/create', createChat);
ChatRouter.get('/show', getAllChats);

module.exports = ChatRouter;