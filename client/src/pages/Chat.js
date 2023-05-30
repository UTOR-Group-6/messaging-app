import React from 'react'
import './Chat.css'
import Message from '../components/Message'

export default function Chat() {
    return (
        <div className="chat-div">
            <div className="chat">
                <div className="chat-wrapper">
                    <div className="chatOutput">
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <div className="chatInput"></div>
                </div>
            </div>
        </div>
    )
}