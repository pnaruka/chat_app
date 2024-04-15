const express = require('express');
const { createMsg, getAllMsg } = require('../controllers/msgControllers');

const MessageRouter = express.Router();

MessageRouter.post('/create',createMsg);
MessageRouter.get('/fetch', getAllMsg);

module.exports = MessageRouter;