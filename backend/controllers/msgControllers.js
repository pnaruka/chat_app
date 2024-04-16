const asyncHandler = require('express-async-handler');
const { MessageModel } = require('../models/messageModel');
const { UserModel } = require('../models/userModel');
const { ChatModel } = require('../models/chatModel');

const createMsg = asyncHandler( async(req, res)=>{
    const {content, chatId} = req.body;
    if(!content || !chatId){
        return res.status(400).send('Please provide all required fields.');
    }

    const msg = {
        sender: req.user._id,
        content,
        chat: chatId
    };

    try {
        const crtMessage = await MessageModel.create(msg);
        
        const fullMessage = await MessageModel.find({_id: crtMessage._id}).populate('sender','name profilePic');
       /* crtMessage = await UserModel.populate(crtMessage,{
            path: 'chat.users',
            select: 'name pic email'
        });
        */

        await ChatModel.findByIdAndUpdate(chatId,{
            lastMessage: crtMessage._id
        });

        res.status(201).json(fullMessage);

    } catch (error) {
        res.status(500).send(error);
    }
});

const getAllMsg = asyncHandler( async(req, res)=>{
    const chatId = req.query.chatId;
    if(!chatId){
        return res.status(400).send('Please provide all required fields.');
    }

    try {
        const allMessages = await MessageModel.find({chat: chatId}).populate('sender','name profilePic email');

        res.status(201).json(allMessages);

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = {
    createMsg,
    getAllMsg
}