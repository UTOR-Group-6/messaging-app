import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { CREATE_CHAT } from '../../utils/mutations';
import { QUERY_USER, QUERY_FIND_USER } from '../../utils/queries';
import './CreateChat.css'

export default function CreateChat() {
    const [formState, setFormState] = useState({ user: '' });
    const [create] = useMutation(CREATE_CHAT);
    const [findUser, { loading, data: userData }] = useLazyQuery(QUERY_FIND_USER);
    const { data } = useQuery(QUERY_USER);
    const currentUser = {data}
    

    useEffect(() => {
        if (userData) {
            const searchedUser = userData.findUser._id
        }
    }, [userData])

    const handleCreateChat = async (event) => {
        event.preventDefault();
        
        try {
            await findUser({
                variables: { username: formState.username },
              });
              
            const searchedUser = await userData.findUser._id
            console.log(searchedUser)


            // const mutationResponse = await create({
            //     variables: { users: [searchedUser] }
            // })
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
            <form onSubmit={handleCreateChat}>
                <div>
                    <input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="Search for a user"
                        onChange={handleInputChange}
                    />
                </div>          

                    <div>
                    <p className="username-err">That user does not exist. Please check your spelling and try again!</p>
                    </div>

                <div className="create-btn-div">
                    <button type="submit" className="create-btn">Create Chat</button>
                </div>
            </form>
        </div>
    );
}