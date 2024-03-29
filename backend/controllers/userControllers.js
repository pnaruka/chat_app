const asyncHandler = require('express-async-handler');
const { UserModel } = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');

const createUser = asyncHandler(async (req, res) => {
    const { user } = req.body;

    if (!user.name || !user.email || !user.password) {
        res.status(400);
        throw new Error('Please fill all required fields.');
    }

    if (!validator.isEmail(user.email)) {
        res.status(400);
        throw new Error('Invalid email');
    }
    if (!validator.isStrongPassword(user.password)) {
        res.status(400);
        throw new Error('Password not strong enough.');
    }
    const userExists = await UserModel.findOne({ email: user.email });
    if (userExists) {
        res.status(400);
        throw new Error('Email already registered.');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const newUser = UserModel.create({
        name: user.name,
        email: user.email,
        password: hashPassword,
        profilePic: user.profilePic
    });
    if(!newUser){
        res.status(400);
        throw new Error('Failed to create user.');
    }
    const token = createToken(newUser._id, newUser.email);
    return res.status(201).json({token});

});

module.exports = {
    createUser
}