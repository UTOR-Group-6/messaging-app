import React, { useState } from 'react';
import { CREATE_CHAT, UPDATE_USER_CHATS } from '../../utils/mutations';
import { QUERY_USER, QUERY_FIND_USER } from '../../utils/queries';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import './CreateChat.css'

export default function CreateChat() {
    const [formState, setFormState] = useState({ username: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [create] = useMutation(CREATE_CHAT);
    const [updateUser] = useMutation(UPDATE_USER_CHATS);
    const [findUser, { data: userData }] = useLazyQuery(QUERY_FIND_USER);
    const { data } = useQuery(QUERY_USER);


    const handleCreateChat = async (event) => {
        event.preventDefault();

        if (!formState.username) {
            setErrorMessage('Please enter a username')
            return;
        }
        
        try {
            // runs QUERY_USER and QUERY_FIND_USER to get current user, and searched user id's      
            const searchedUser = userData.findUser._id
            const currentUser = data.user._id

            // mutations to create chat, and push the newly created chat into both user's Chat arrays
            const mutationResponse = await create({
                variables: { users: [searchedUser, currentUser] }
            });

            const chatId = mutationResponse.data.createChat._id;
            console.log(chatId)

            const updatedCurrentUser = await updateUser({
                variables: { 
                    _id: currentUser,
                    chatId: chatId
                }
            })

            const updatedSearchedUser = await updateUser({
                variables: { 
                    _id: searchedUser,
                    chatId: chatId
                }
            })

            console.log(updatedCurrentUser)
            console.log(updatedSearchedUser)

            setFormState({
                username: ''
            });
            setErrorMessage('');


        } catch (err) {
            setErrorMessage('Sorry, that user does not exist')
            console.log(err);
            return;
        }
    };

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]:value
        });
        const inputValue = event.target.value

        await findUser({
            variables: { username: inputValue },
        })
      };

    return (
        <div className="user-search-div">
            <form className="user-search-form" onSubmit={handleCreateChat}>
                <div className="user-search">
                    <div className="username-div">
                        <input
                            type="username"
                            name="username"
                            id="username"
                            placeholder={"Search for a user"}
                            value={formState.username}
                            onChange={handleInputChange}
                        />
                    </div>          
                    <div className="create-btn-div">
                        <button type="submit" className="create-btn">Create Chat</button>
                    </div>
                </div>
                {errorMessage && (
                    <div>
                        <p className="username-err">{errorMessage}</p>
                    </div>
                )}
            </form>
        </div>
    );
}