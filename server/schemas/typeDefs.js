const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Message {
        _id: ID
        messageText: String
    }

    type Chat {
        _id: ID
        messages: [Message]
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        chats: [Chat]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        messages: [Message]
        chats(messages: ID): [Chat]
        chat(_id: ID!): Chat
        user: User

    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
    }
`;

module.exports = typeDefs;