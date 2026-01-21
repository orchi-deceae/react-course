import { useEffect, useState } from 'react';
import { Chatbot } from 'supersimpledev';
import ChatMessages from './components/chatMessages';
import ChatInput from './components/chatInput';
import './styles/App.css';

function App() {
    const [
        chatMessages, 
        setChatMessages,
    ] = useState(JSON.parse(localStorage.getItem("messages")) || []);

    useEffect(()=>{
        localStorage.setItem("messages", JSON.stringify(chatMessages))
    }, [chatMessages])

    useEffect(()=>{
        Chatbot.addResponses({
            'Bonjour salut': `Bonjour! Comment puis-je aider toi`,
            'Ça va?': `Ça va bien! Comment peux j'aider vous?`,
            'Bon journee': `Au revoir, bon journey!`,
            'Merci beacoup': 'Non problème! Laisser moi sais si vous besoin aider avec rien autre!',
        })
    }, [])

    return (<div className="app-">
        <ChatMessages
            chatMessages={chatMessages}
        />
        <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
        />
    </div>);
}

export default App
