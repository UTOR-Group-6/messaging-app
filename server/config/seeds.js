const db = require('./connection');
const { Chat, User, Message } = require('../models');

db.once('open', async () => {
    await User.deleteMany();

    const users = await User.insertMany([
        {
            username: 'coolkid123',
            email: 'coolkid123@email.com',
            password: 'password'
        },
        {
            username: 'sadkid123',
            email: 'sadkid123@email.com',
            password: 'password'
        },
        {
            username: 'happykid123',
            email: 'happykid123@email.com',
            password: 'password'
        }
    ]);

    console.log('Users seeded');


    await Chat.deleteMany();

    const chats = await Chat.insertMany([
        { members: [users[0]._id, users[1]._id] },
        { members: [users[0]._id, users[2]._id] }
    ])

    console.log('Chats seeded');


    await Message.deleteMany();

    await Message.insertMany([
        {
            sender: users[0]._id,
            chatId: chats[0]._id,
            messageText: 'Hello! How are you doing?'
        },
        {
            sender: users[0]._id,
            chatId: chats[0]._id,
            messageText: 'Are you on the way?'
        },
        {
            sender: users[1]._id,
            chatId: chats[0]._id,
            messageText: 'Be there in 10'
        },
        {
            sender: users[2]._id,
            chatId: chats[1]._id,
            messageText: 'hey hey hey'
        },
    ])

    console.log('Messages seeded');

    process.exit();
})