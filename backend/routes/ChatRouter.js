const express = require('express');
const { createChat } = require('../controllers/chatControllers');

const ChatRouter = express.Router();

ChatRouter.get('/create', createChat);

module.exports = ChatRouter;