const express = require('express');
const { createUser, loginUser, allUsers } = require('../controllers/userControllers');
const requireAuth = require('../middlewares/requireAuth');

const UserRouter = express.Router();

UserRouter.post('/login',loginUser);
UserRouter.post('/signup',createUser);
UserRouter.get('/find', requireAuth, allUsers);

module.exports = UserRouter;