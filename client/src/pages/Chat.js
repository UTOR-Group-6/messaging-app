import React from 'react'
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth"

import { useQuery } from '@apollo/client';
import {  } from '../utils/queries';

import './Chat.css'
import Message from '../components/Message/Message'
import Conversation from '../components/Conversation/Conversation'
import Navbar from '../components/Navbar/Navbar'

export default function Chat() {
	const { data } = useQuery();
	let user;

	if (data) {
		user = data.user;
	}
	console.log(user)

	if (Auth.loggedIn()) {
		return (
			<>
				<Navbar />
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