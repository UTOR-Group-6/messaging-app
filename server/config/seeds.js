const db = require('./connection');
const { Chat, User, Message } = require('../models');

db.once('open', async () => {
    await Message.deleteMany();

    const messages = await Message.insertMany([
        {
            messageText: 'Hello! How are you doing?'
        },
        {
            messageText: 'Are you on the way?'
        },
        {
            messageText: 'Be there in 10'
        },
        {
            messageText: 'hey hey hey'
        },
    ])

    console.log('Messages seeded');


    await Chat.deleteMany();

    const chats = await Chat.insertMany([
        { 
            messages: [messages[0]._id, messages[1]._id, messages[2]._id]
        },
        { 
            messages: [messages[3]._id]
        }
    ])

    console.log('Chats seeded');


    await User.deleteMany();

    await User.insertMany([
        {
            username: 'coolkid123',
            email: 'coolkid123@email.com',
            password: 'password',
            chats: [chats[0]._id, chats[1]._id]
        },
        {
            username: 'sadkid123',
            email: 'sadkid123@email.com',
            password: 'password',
            chats: [chats[0]._id]
        },
        {
            username: 'happykid123',
            email: 'happykid123@email.com',
            password: 'password',
            chats: [chats[1]._id]
        }
    ]);

    console.log('Users seeded');

    process.exit();
})