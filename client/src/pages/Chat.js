import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client'
import { CREATE_CHAT } from '../utils/mutations';

import './Chat.css'
import Message from '../components/Message/Message'
import Conversation from '../components/Conversation/Conversation'
import Navbar from '../components/Navbar/Navbar'

export default function Chat() {
	const handleChatSelect = async (event) => {
		const selectedConversation = event.target.value;
		console.log(selectedConversation)
	}

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
									<Conversation />
								</div>
						</div>
					</div>
					<div className="chat">
						<div className="chat-wrapper">
							<div className="chat-output">
							<div className="">
								<div className="single-message">
									{/* update this to profile pictures */}
									<img className="message-img" src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="user profile of existing conversations"/>
									<p className="message-text">Hello! This is my message. Hello! This is my message. random words to fill up the space so I can see how it looks wowowowowowowowjkahsjkdhfiuahsuiodhfjkasnd aasdfasdfasdf asdfasdf asdf asdf asdf asdf asdfasdf sdhfnjkasdfjk</p>
								</div>  
							</div>
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