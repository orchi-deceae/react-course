import React, { useState } from "react"
import { Chatbot } from "supersimpledev"
import dayjs from "supersimpledev/dayjs";
import "./chatInput.css"

type Props = {
    chatMessages: ChatMessageProps[],
    setChatMessages: (chatMessages: ChatMessageProps[]) => void
}
type ChatMessageProps = {
    message: string | React.JSX.Element,
    sender: string,
    time: string,
    key: string
}
type ChangeEvType = React.ChangeEvent<HTMLInputElement>
type KeyEvType = React.KeyboardEvent<HTMLInputElement>

function ChatInput({ chatMessages, setChatMessages }: Props) {
    const [inputText, setInputText] = useState('');
    const now = dayjs().format("HH:mm");

    async function sendMessage() {
        try { if (chatMessages[chatMessages.length - 1].message === "Loading") return console.log('Let message finish loading') } catch (err) { console.error(err) }
        if (!inputText) return console.log('Please type words')

        const newChatMessages = [
            ...chatMessages, {
                message: inputText,
                sender: "user",
                time: now,
                key: crypto.randomUUID()
            }
        ]
        setInputText('')

        setChatMessages(newChatMessages);
        setChatMessages([
            ...newChatMessages, {
                message: <img src="/chatbot-project/loading-spinner.gif" />,
                sender: "robot",
                time: "",
                key: crypto.randomUUID()
            }
        ]);
        setChatMessages([
            ...newChatMessages, {
                message: (await Chatbot.getResponseAsync(inputText)),
                sender: "robot",
                time: now,
                key: crypto.randomUUID()
            }
        ]);
    }
    function keyAction(ev: KeyEvType) {
        if (ev.key === "Enter") { sendMessage() }
        if (ev.key === "Escape") { setInputText('') }
    }
    function saveInputText(ev: ChangeEvType) { setInputText(ev.target.value) }

    function clearMessage() {
        localStorage.removeItem("messages")
        setChatMessages([])
    }

    return (<div className="chat-input-container-">
        <input
            type="text"
            placeholder="Send a message to Chatbot"
            size={30}
            onChange={saveInputText}
            onKeyDown={keyAction}
            value={inputText}
            className="chat-input-"
        />
        <button className="send-button-" onClick={sendMessage} >Send</button>
        <button className="clear-button-" onClick={clearMessage}>Clear</button>
    </div>)
}


export default ChatInput