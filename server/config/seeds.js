const db = require('./connection');
const { Chat, User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();

    const user = await User.insertMany([
        {
            username: 'user1',
            email: 'user1@email.com',
            password: 'password',
        },
        {
            username: 'user2',
            email: 'user2@email.com',
            password: 'password',
        },
        {
            username: 'user3',
            email: 'user3@email.com',
            password: 'password',
        }
    ]);

    console.log('Users seeded');

    await Chat.deleteMany();

    await Chat.insertMany([
        { 
            messages: [
                {
                    messageText: 'Hello! How are you doing?',
                    user: "user1",
                },
                {
                    messageText: 'Are you on the way?',
                    user: "user1",
                },
                {
                    messageText: '10 minutes!',
                    user: "user2",
                },
            ],
            users: [user[0]._id, user[1].id]
        },
        { 
            messages: [        
                {
                messageText: 'hey hey hey',
                user: "user2",
                },
            ],
            users: [user[1]._id, user[2]._id]
        },
        { 
            messages: [        
                {
                messageText: 'I like your name',
                user: "user3",
                },
            ],
            users: [user[0]._id, user[2]._id]
        }
    ]);

    console.log('Chats seeded');

    process.exit();
})