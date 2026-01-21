import { useState } from "react"
import { Chatbot } from "supersimpledev"
import dayjs from "supersimpledev/dayjs";
import "../styles/App/chatInput.css"

function ChatInput({ chatMessages, setChatMessages}) {
    const [inputText, setInpetText] = useState('');
    const now = dayjs().format("HH:mm");

    async function sendMessage() {
        try {if (chatMessages[chatMessages.length-1].message === "Loading") return console.log('Let message finish loading')} catch(err) { err }
        if (!inputText) return console.log('Please type words')

        const newChatMessages = [
            ...chatMessages, {
                message: inputText,
                sender: "user",
                time: now,
                key: crypto.randomUUID()
            }
        ]
        setInpetText('')

        setChatMessages(newChatMessages);
        setChatMessages([
            ...newChatMessages, {
                message: <img src="/loading-spinner.gif" />,
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
    function keyAction(ev) {
        if (ev.key === "Enter") { sendMessage(ev.target.value) }
        if (ev.key === "Escape") { setInpetText('') }
    }
    function saveInputText(ev) { setInpetText(ev.target.value) }

    function clearMessage(){
        localStorage.removeItem("messages")
        setChatMessages([])
    }

    return (<div className="chat-input-container-">
        <input
            type="text"
            placeholder="Send a message to Chatbot"
            size="30"
            onChange={saveInputText}
            onKeyDown={keyAction}
            value={inputText}
            className="chat-input-"
        />
        <button className="send-button-"  onClick={sendMessage} >Send</button>
        <button className="clear-button-" onClick={clearMessage}>Clear</button>
    </div>)
}


export default ChatInput