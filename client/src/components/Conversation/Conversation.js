import React from 'react';

import { useQuery } from '@apollo/client'
import { QUERY_USER } from '../../utils/queries';
import './Conversation.css';
import whale from "../../assets/icons/whale.jpeg"


export default function Conversation({ handleChatSelect }) {
	const { loading, data } = useQuery(QUERY_USER)

	if (loading) {
		return <p>Loading...</p>
	}
	const user = data.user

	// gets all chats of the logged in user, then renders content for each chat in array
	return (
		<>
			{user.chats.map((chat) => {
				return (
					<div 
						className="conversation" 
						key={chat._id} 
						conversationid={chat._id}
						onClick={() => handleChatSelect(chat._id)}
					>
						<img className="conversation-img" src={whale} alt="user profile of existing conversations"/>
						{chat.users[0].username === user.username ? (
							<span>{chat.users[1].username}</span>
						) : (
							<span>{chat.users[0].username}</span>
						)}
					</div>
				)
			})}
		</>
	);
}