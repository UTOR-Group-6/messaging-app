import React from 'react'
import './Chat.css'
import Message from '../components/Message'

export default function Chat() {
    return (
        <div className="chat-div">
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
}