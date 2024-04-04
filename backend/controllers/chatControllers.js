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
    //console.log(req.user);
    try {
        const chat = await ChatModel.find({
            $and: [
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }).populate("users", "-password")
            .populate("lastMessage")
            .populate("groupAdmin", "-password")
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

const createGroup = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.groupName) {
        return res.status(400).json("Please fill all the fields.");
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).json("Please add at least 2 members.");
    }

    try {
        users.push(req.user._id);
        const groupChat = await ChatModel.create({
            chatName: req.body.groupName,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user._id //check please
        });
        const fullGroupChat = await ChatModel.find({
            _id: groupChat._id
        }).populate("users", "-password")
            .populate("lastMessage")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 });

        res.status(201).json(fullGroupChat);

    } catch (error) {
        return res.status(500).json(error);
    }

});

const deleteGroup = asyncHandler( async(req, res)=>{
    const {groupId} = req.body;
    if(!groupId){
        return res.status(400).send("Please provide the group ID");
    }

    const fullChat = await ChatModel.findOne({
        _id: groupId
    }).populate("groupAdmin", "-password");
    //console.log(fullChat);
    if(!fullChat || fullChat.length === 0){
        return res.status(400).send("No such group exists");
    }
    //console.log( typeof fullChat.groupAdmin._id);
    //console.log(typeof req.user._id);
    if(!fullChat.groupAdmin._id.equals(req.user._id)){
        return res.status(401).send("Only the admin can delete the group.");
    }

    try {
        await ChatModel.findByIdAndDelete({ _id: groupId });
        return res.status(200).send("Group deleted successfully.");
    } catch (error) {
        return res.status(500).send(error)
    }
})

const groupAddUser = asyncHandler( async(req, res)=>{
    const {groupId, userId} = req.body;
    const added = await ChatModel.findByIdAndUpdate(
        groupId,
        {
            $push: {users: userId}
        },
        {new: true}
    ).populate("users", "-password")
     .populate("groupAdmin", "-password");

     if(!added){
        return res.status(404).send("Chat not found.");
     }
     else{
        return res.status(200).json(added);
     }
} );

const groupRemoveUser = asyncHandler( async(req, res)=>{
    const {groupId, userId} = req.body;
    const removed = await ChatModel.findByIdAndUpdate(
        groupId,
        {
            $pull: {users: userId}
        },
        {new: true}
    ).populate("users", "-password")
     .populate("groupAdmin", "-password");

     if(!removed){
        return res.status(404).send("Chat not found.");
     }
     else{
        return res.status(200).json(removed);
     }
} );

module.exports = {
    createChat,
    getAllChats,
    createGroup,
    deleteGroup,
    groupAddUser,
    groupRemoveUser
}