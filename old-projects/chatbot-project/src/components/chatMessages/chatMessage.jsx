
function ChatMessage({ message, sender, time }) {
    return (<div className={`chat-message-container-${sender}-`}>
        {sender === "robot" && (<img className="img-" src={`/${sender}.png`} />)}
        <span className="msg-">{message}<span className="time-">{time}</span></span>
        {sender === "user" && (<img className="img-" src={`/profile-1.jpg`} />)}
    </div>)
}

export default ChatMessage