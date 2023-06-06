import React, { useEffect } from 'react';
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client'
import './Conversation.css';


export default function Conversation() {
	const { loading, data } = useQuery(QUERY_USER)
	
	if (loading) {
		return <p>Loading...</p>
	}
	const user = data.user
	console.log(user)

	return (
		<>
			{user.chats.map((chat) => {
				return (
					<div className="conversation" key={chat._id} >
						{/* <img className="conversation-img" src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="user profile of existing conversations"/> */}
						<span className="conversation-username">{chat._id}</span>
					</div>
				)
			})}
		</>
	);
}