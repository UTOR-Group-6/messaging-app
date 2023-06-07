import React from 'react';

import { useQuery } from '@apollo/client'
import { QUERY_USER } from '../../utils/queries';
import './Conversation.css';


export default function Conversation({ handleChatSelect }) {
	const { loading, data } = useQuery(QUERY_USER)
	
	if (loading) {
		return <p>Loading...</p>
	}
	const user = data.user

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
						{/* <img className="conversation-img" src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="user profile of existing conversations"/> */}
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