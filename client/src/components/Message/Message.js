import "./Message.css"

export default function Message({own}) {
    return (
        <div className={own ? "message-div own" : "message"}>
            <div className="single-message">
                {/* update this to profile pictures */}
                <img className="message-img" src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="user profile of existing conversations"/>
                <p className="message-text">Hello! This is my message. Hello! This is my message. random words to fill up the space so I can see how it looks wowowowowowowowjkahsjkdhfiuahsuiodhfjkasnd aasdfasdfasdf asdfasdf asdf asdf asdf asdf asdfasdf sdhfnjkasdfjk</p>
            </div>  
        </div>
    );
}