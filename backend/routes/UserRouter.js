const express = require('express');
const { createUser } = require('../controllers/userControllers');

const UserRouter = express.Router();

UserRouter.post('/login',()=>{});
UserRouter.post('/signup',createUser);

module.exports = UserRouter;