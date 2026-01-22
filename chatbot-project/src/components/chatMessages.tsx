import { useEffect, useRef } from "react";
import ChatMessage from "./chatMessages/chatMessage"
import "./chatMessages.css"

type ChatMessageType = {
    message: string,
    sender: string,
    time: string
}

type Props = {
    chatMessages: ChatMessageType[]
}
function ChatMessages({ chatMessages }: Props) {

    function useAutoScrool(dependencies: ChatMessageType[]){
        useEffect(() => {
            const chatMsgRef = chatMessagesRef.current;
            if (chatMsgRef) chatMsgRef.scrollTop = chatMsgRef.scrollHeight
        }, [dependencies]);
        
        return useRef<HTMLDivElement>(null)
    }
    
    const chatMessagesRef = useAutoScrool(chatMessages)

    return (<div className="chat-messages-container-" ref={chatMessagesRef}>
        {chatMessages.map((chatMessage: ChatMessageType) => {
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