import "./Message.css"

export default function Message({own}) {
    return (
        <div className="message-div own">
            <div className="single-message">
                <p className="message-user">coolkid123</p>
                <p className="message-text">Hello! This is my message</p>
            </div>  
        </div>
    );
}