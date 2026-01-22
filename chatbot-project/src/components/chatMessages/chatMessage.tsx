
type prop = {
    message: string,
    sender: string,
    time: string
}

function ChatMessage({ message, sender, time }: prop) {
    return (<div className={`chat-message-container-${sender}-`}>
        {sender === "robot" && (<img className="img-" src={`/chatbot-project/${sender}.png`} />)}
        <span className="msg-">{message}<span className="time-">{time}</span></span>
        {sender === "user" && (<img className="img-" src={`/chatbot-project/profile-1.jpg`} />)}
    </div>)
}

export default ChatMessage