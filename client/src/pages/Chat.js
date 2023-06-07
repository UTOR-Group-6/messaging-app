import React, { useState, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { QUERY_CHAT, QUERY_USER } from '../utils/queries';
import { UPDATE_CHAT } from '../utils/mutations';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'

import './Chat.css'
import Conversation from '../components/Conversation/Conversation'
import Navbar from '../components/Navbar/Navbar'

export default function Chat() {
	const [formState, setFormState] = useState({ messageText: '' });
	const [selectedChat, setSelectedChat] = useState('');
	const [findChat, { data: chatData, refetch: refetchChat }] = useLazyQuery(QUERY_CHAT);
	const [findCurrentUser, data] = useLazyQuery(QUERY_USER);
	const {loading} = useQuery(QUERY_CHAT);
	const [send] = useMutation(UPDATE_CHAT);
	const [showForm, setShowForm] = useState(false)
	const scrollRef = useRef();


	const handleChatSelect = async (chatId) => {
        setSelectedChat(chatId);

		await findChat({
			variables: { _id: chatId }
		})
		findCurrentUser();
		setShowForm(true);
    }; 	

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (!formState.messageText) {
			console.log("null :(")
			return null;
		}

		try {
			const currentUser = data.data.user.username

			await send({
				variables: {
					_id: selectedChat,
					messageText: formState.messageText,
					user: currentUser,
				}
			})

		} catch (err) {
			console.error(err);
			return;
		}
		setFormState({
			messageText: ''
		})

		refetchChat()
	}

	const handleInputChange = async (event) => {
		const { name, value } = event.target;
		setFormState({
		  ...formState,
		  [name]:value
		});
	  };

	useEffect(() => {
		if (chatData && data) {
			setSelectedChat(chatData.chat._id)
		}
	}, [chatData, data])

	useEffect(() => {
		scrollRef.current?.scrollIntoView({behavior: "smooth"})
	}, [chatData])

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
											<div className='message-div' key={message._id} ref={scrollRef}>
												<div className="single-message">
													{/* update this to profile pictures */}
													<p className="message-user">{message.user}</p>
													<p className="message-text">{message.messageText}</p>
												</div>  
											</div>
										))}
									</>
								)}
							</div>
							{showForm && (
								<form className="chat-input" onSubmit={handleFormSubmit}>
									<textarea 
										type="messageText"
										name="messageText"
										id="messageText"
										onChange={handleInputChange}
										value={formState.messageText}
										className="chat-input-ta" 
										placeholder="send a message"
									>
									</textarea>
									<button type="submit" className="chat-submit-btn">Send</button>
								</form>
							)}
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