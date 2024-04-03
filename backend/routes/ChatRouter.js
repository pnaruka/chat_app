const express = require('express');
const { createChat, getAllChats, createGroup, deleteGroup, groupAddUser, groupRemoveUser } = require('../controllers/chatControllers');

const ChatRouter = express.Router();

ChatRouter.post('/create', createChat);
ChatRouter.get('/show', getAllChats);
ChatRouter.post('/group/create', createGroup);
ChatRouter.delete('/group/delete', deleteGroup);
ChatRouter.put("/group/addUser", groupAddUser);
ChatRouter.put("/group/removeUser", groupRemoveUser);

module.exports = ChatRouter;