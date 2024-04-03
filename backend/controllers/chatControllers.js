const asyncHandler = require('express-async-handler');
const { UserModel } = require('../models/userModel');
const { ChatModel } = require('../models/chatModel');

const createChat = asyncHandler(async (req, res) => {
    const toUserId = req.body.userId;
    const fromUserId = req.user._id;

    if (!toUserId) {
        console.log('user param not provided');
        return res.status(400).send("Error occured.");
    }

    let isChat = await ChatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: toUserId } } },
            { users: { $elemMatch: { $eq: fromUserId } } }
        ]
    }).populate("users", "-password").populate("lastMessage");

    isChat = await UserModel.populate(isChat, {
        path: "lastMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        return res.status(200).json(isChat);
    }

    const chatData = {
        chatName: "sender",
        isGroupChat: "false",
        users: [toUserId, fromUserId]
    };
    try {
        const createdChat = await ChatModel.create(chatData);
        const fullChat = await ChatModel.find({ _id: createdChat._id }).populate("users", "-password");
        return res.status(200).json(fullChat);
    } catch (error) {
        return res.status(500).json(error);
    }
});

const getAllChats = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const chat = await ChatModel.find({
            $and: [
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }).populate("users", "-password")
            .populate("lastMessage")
            .populate("groupAdmin")
            .sort({ updatedAt: -1 });

        if (!chat) {
            return res.status(204).send("No chats to show.");
        }
        //console.log(chat);
        return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json(error);
    }

})

module.exports = {
    createChat,
    getAllChats
}