import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { QUERY_CHAT, QUERY_USER } from '../utils/queries';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'

import './Chat.css'
import Message from '../components/Message/Message'
import Conversation from '../components/Conversation/Conversation'
import Navbar from '../components/Navbar/Navbar'

export default function Chat() {
	const [selectedChat, setSelectedChat] = useState(null);
	const [findChat, { data: chatData }] = useLazyQuery(QUERY_CHAT)
	const { loading } = useQuery(QUERY_CHAT)
	const { data } = useQuery(QUERY_USER)


	const handleChatSelect = async (chatId) => {
        setSelectedChat(chatId);
		console.log(chatId)

		const chat = await findChat({
			variables: { _id: chatId }
		})

		console.log(chatData)
		console.log(data.user.username)

    }; 	

	if (Auth.loggedIn()) {
		return (
			<>
				<Navbar />
				<div className="chat-div">
					<div className="sidebar">
						<div className="sidebar-wrapper">
								<div className="sidebar-top">
									<input className="search-bar" placeholder="Search for conversations"/>
									<FontAwesomeIcon className="add-chat-btn" icon={faCirclePlus} />
								</div>
								<div 
								className="conversation-div"
								name="conversation"
								id="conversation"
								>
									<Conversation handleChatSelect={handleChatSelect} />
								</div>
						</div>
					</div>
					<div className="chat">
						<div className="chat-wrapper">
							<div className="chat-output">
								{loading ? (
									<p>Loading...</p>
								) : (
									<>
										{chatData && data && chatData.chat.messages.map((message) => (
											<div className={`message-div ${message.user === data.user.username ? 'own' : ''}`} key={message._id}>
												<div className="single-message">
													{/* update this to profile pictures */}
													<img className="message-img" src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="user profile of existing conversations"/>
													<p className="message-text">{message.messageText}</p>
												</div>  
											</div>
										))}
									</>
								)}
							</div>
							<div className="chat-input">
								<textarea className="chat-input-ta" placeholder="send a message"></textarea>
								<button className="chat-submit-btn">Send</button>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	} else {
		return (
			<div>
				<Navigate to="/login" replace={true}/>
			</div>
		)
	}
}