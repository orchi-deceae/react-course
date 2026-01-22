import { useEffect, useRef } from "react";
import ChatMessage from "./chatMessages/chatMessage"
import "../styles/App/chatMessages.css"

function ChatMessages({ chatMessages }) {

    function useAutoScrool(dependencies){
        useEffect(() => {
            const chatMsgRef = chatMessagesRef.current;
            if (chatMsgRef) chatMsgRef.scrollTop = chatMsgRef.scrollHeight
        }, [dependencies]);
        
        return useRef(null)
    }
    
    const chatMessagesRef = useAutoScrool(chatMessages)

    return (<div className="chat-messages-container-" ref={chatMessagesRef}>
        {chatMessages.map((chatMessage) => {
            return (<ChatMessage
                message={chatMessage.message}
                sender={chatMessage.sender}
                time={chatMessage.time}
                key={crypto.randomUUID()}
            />)
        })}
        {!chatMessages.length && (<div className="welcome-text-">Welcome to the chatbot project! Send a message using textbox below.</div>)}
    </div>)
}


export default ChatMessages