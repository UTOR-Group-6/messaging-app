import React, {useState} from 'react'
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client'
import { CREATE_CHAT } from '../utils/mutations';
import Modal from 'react-modal';

import './Chat.css'
import Message from '../components/Message/Message'
import Conversation from '../components/Conversation/Conversation'
import Navbar from '../components/Navbar/Navbar'
import CreateChat from '../components/CreateChat/CreateChat';

Modal.setAppElement('#root');

export default function Chat() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
									<FontAwesomeIcon className="add-chat-btn" icon={faCirclePlus} onClick={() => setIsModalOpen(true)} />
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