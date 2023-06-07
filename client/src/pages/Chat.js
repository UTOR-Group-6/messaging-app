import React, { useState, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { QUERY_CHAT, QUERY_USER } from '../utils/queries';
import { UPDATE_CHAT } from '../utils/mutations';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { CREATE_CHAT } from '../utils/mutations';
import Modal from 'react-modal';


import './Chat.css'
import Conversation from '../components/Conversation/Conversation'
import Navbar from '../components/Navbar/Navbar'
import CreateChat from '../components/CreateChat/CreateChat';

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
		// takes chatId of conversation selected
        setSelectedChat(chatId);

		// runs QUERY_CHAT based on selected chat's id, then runs query to get data of logged in user
		await findChat({
			variables: { _id: chatId }
		})

		findCurrentUser();

		// displays text box and submit button to send a message
		setShowForm(true);

		// manually refetch every second to get new messages

		function refetchMessages() {
			refetchChat()
		}
		setInterval(refetchMessages, 1000)
    }; 	

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (!formState.messageText) {
			// prevents function from continuing if user did not enter any text
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

		// refetch chat to display new message created
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

	// scrolls to newest message whenever chatData is updated
	useEffect(() => {
		scrollRef.current?.scrollIntoView({behavior: "smooth"})
	}, [chatData])


	Modal.setAppElement('#root');

    const [isModalOpen, setIsModalOpen] = useState(false);
	const handleChatCreate = async (event) => {

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

		// refetch chat to display new message created
		refetchChat()
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
									<FontAwesomeIcon className="add-chat-btn" icon={faCirclePlus} onClick={() => setIsModalOpen(true)} />
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
				<Modal
					isOpen={isModalOpen}
					onRequestClose={() => setIsModalOpen(false)}
					contentLabel="Create Chat Modal"
				>
					<CreateChat onClose={() => setIsModalOpen(false)} />
				</Modal>
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