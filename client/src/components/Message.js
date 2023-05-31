import "./Message.css"

export default function Message({own}) {
    return (
        <div className={own ? "message-div own" : "message"}>
            <div className="single-message">
                <p className="message-user">coolkid123</p>
                <p className="message-text">Hello! This is my message. random words to fill up the space so I can see how it looks wowowowowowowowjkahsjkdhfiuahsuiodhfjkasnd asdhfnjkasdfjk</p>
            </div>  
        </div>
    );
}