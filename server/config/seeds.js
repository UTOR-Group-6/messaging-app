const db = require('./connection');
const { Chat, User, Message } = require('../models');

db.once('open', async () => {
    await User.deleteMany();

    const user = await User.insertMany([
        {
            username: 'coolkid123',
            email: 'coolkid123@email.com',
            password: 'password',
        },
        {
            username: 'sadkid123',
            email: 'sadkid123@email.com',
            password: 'password',
        },
        {
            username: 'happykid123',
            email: 'happykid123@email.com',
            password: 'password',
        }
    ]);

    console.log('Users seeded');

    await Chat.deleteMany();

    const chat = await Chat.insertMany([
        { 
            users: [user[0]._id, user[1]._id]
        },
        { 
            users: [user[1]._id, user[2]._id]
        },
        { 
            users: [user[0]._id, user[2]._id]
        }
    ]);

    console.log('Chats seeded');

    await Message.deleteMany();

    await Message.insertMany([
        {
            messageText: 'Hello! How are you doing?',
            user: user[0]._id,
            chat: chat[0]._id
        },
        {
            messageText: 'Are you on the way?',
            user: user[0]._id,
            chat: chat[0]._id
        },
        {
            messageText: 'Be there in 10',
            user: user[1]._id,
            chat: chat[0]._id
        },
        {
            messageText: 'hey hey hey',
            user: user[2]._id,
            chat: chat[1]._id
        },
        {
            messageText: 'I like your name',
            user: user[2]._id,
            chat: chat[2]._id
        },
    ])

    console.log('Messages seeded');

    process.exit();
})