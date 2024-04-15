const express = require('express');
const { createMsg } = require('../controllers/msgControllers');

const MessageRouter = express.Router();

MessageRouter.post('/create',createMsg);

module.exports = MessageRouter;