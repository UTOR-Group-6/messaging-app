import React, { useState } from 'react';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { CREATE_CHAT, UPDATE_USER_CHATS } from '../../utils/mutations';
import { QUERY_USER, QUERY_FIND_USER } from '../../utils/queries';
import './CreateChat.css'

export default function CreateChat() {
    const [formState, setFormState] = useState({ user: '' });
    const [create] = useMutation(CREATE_CHAT);
    const [updateUser] = useMutation(UPDATE_USER_CHATS);
    const [findUser, { loading, data: userData }] = useLazyQuery(QUERY_FIND_USER);
    const { data } = useQuery(QUERY_USER);

    const searchUser = async () => {
        await findUser({
            variables: { username: formState.username },
          })
    }

    const handleCreateChat = async (event) => {
        event.preventDefault();
        
        try {      
            await searchUser();
            const searchedUser = userData.findUser._id
            console.log(searchedUser)
            const currentUser = data.user._id
            console.log(currentUser)


            const mutationResponse = await create({
                variables: { users: [searchedUser, currentUser] }
            });

            const chatId = mutationResponse.data.createChat._id;
            console.log(chatId)

            const updatedUser = await updateUser({
                variables: { 
                    _id: currentUser,
                    chatId: chatId
                }
            })

            console.log(updatedUser)


        } catch (err) {
            console.log(err);
            return;
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]:value
        });
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
                            placeholder="Search for a user"
                            onChange={handleInputChange}
                        />
                    </div>          
                    <div className="create-btn-div">
                        <button type="submit" className="create-btn">Create Chat</button>
                    </div>
                </div>
                <div>
                    <p className="username-err">That user does not exist. Please check your spelling and try again!</p>
                </div>
            </form>
        </div>
    );
}