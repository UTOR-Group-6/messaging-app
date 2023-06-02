import { gql } from '@apollo/client';

export const QUERY_MESSAGES = gql`
    {
        messages {
            _id
            messageText
        }
    }
`;

export const QUERY_CHAT = gql `
    query getChats($message: ID) {
        chats(message: $message) {
            _id
            messages {
                _id
                messageText
            }
        }
    }`;

export const QUERY_ALL_CHATS = gql `
    {
        chats {
            _id
            messages {
                _id
                messageText
            }
        }
    }
`;

export const QUERY_USER = gql `
    {
        user {
            username
            email
            chats {
                _id
                messages {
                    _id
                    messageText
                }
            }
        }
    }
`;