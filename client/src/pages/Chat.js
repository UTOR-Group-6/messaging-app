import React from 'react'
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth"

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import './Chat.css'
import Message from '../components/Message/Message'
import Conversation from '../components/Conversation/Conversation'

export default function Chat() {
	const { data } = useQuery(QUERY_USER);
	let user;

	if (data) {
		user = data.user;
	}
	console.log({data})

	if (Auth.loggedIn()) {
		return (
			<div className="chat-div">
				<div className="sidebar">
					<div className="sidebar-wrapper">
							<input className="search-bar" placeholder="Search for conversations"/>
							<div className="conversation-div">
								<Conversation />
								<Conversation />
								<Conversation />
								<Conversation />
								<Conversation />
								<Conversation />
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
		)
	} else {
		return (
			<div>
				<Navigate to="/login" replace={true}/>
			</div>
		)
	}
}