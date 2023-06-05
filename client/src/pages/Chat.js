import React from 'react'
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

	const handleChatCreate = async (event) => {
		try {

		} catch (err) {
			console.error(err);
			return;
		}
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
								<div className="conversation-div">
									<Conversation />
								</div>
						</div>
					</div>
					<div className="chat">
						<div className="chat-wrapper">
							<div className="chat-output">
								<Message />
								<Message own={true}/>
								<Message />
								<Message />
								<Message />
								<Message />
								<Message />
								<Message />
								<Message />
								<Message />
								<Message />
								<Message />
								<Message />
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