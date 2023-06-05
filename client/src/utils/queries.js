import { gql } from '@apollo/client';

export const QUERY_MESSAGE = gql`
    query getMessages {
        message {
            _id
            messageText
            user
            chatId
        }
    }
`;

export const QUERY_ALL_CHATS = gql`
    query getChats {
        chats {
            _id
            users {
                _id
                username
            }
        }
    }
`;

export const QUERY_CHAT = gql`
    query getChat($chatId: ID) {
        chat(chatId: $chatId) {
            _id
            messages {
                _id
                messageText
                user {
                    _id
                    username
                }
            }
        }
    }`;

export const QUERY_USER = gql`
    {
        user {
            _id
            username
            email
        }
    }
`;