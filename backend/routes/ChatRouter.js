const express = require('express');
const { createChat, getAllChats, createGroup, deleteGroup } = require('../controllers/chatControllers');

const ChatRouter = express.Router();

ChatRouter.post('/create', createChat);
ChatRouter.get('/show', getAllChats);
ChatRouter.post('/group/create', createGroup);
ChatRouter.delete('/group/delete', deleteGroup);

module.exports = ChatRouter;