import React, { useEffect, useState, useRef } from "react";
import uid from 'react-uuid';

const WS_URL = 'ws://127.0.0.1:8000/chat'
const Chat = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const ws = useRef(null);
    
    useEffect(()=>{
        ws.current = new WebSocket(WS_URL);
        ws.current.onmessage = ({data}) => {
            console.log(data);
            setMessageList(prevState => [...prevState, data]);
        }
        return ()=>{
            ws.current.close();
        }
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentMessage !== ''){
            ws.current.send(currentMessage);
        }
        setCurrentMessage('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>CHAT</h1>
            <ul style={{height: 400, overflowY:"auto", border: '1px solid'}}>
                {
                    messageList.length === 0 ? (<li>No messages</li> ): (
                        messageList.map(msg=><li key={uid()}>{msg}</li>)
                    )
                }
            </ul>
            <input
                type="text"
                onChange={(e) => setCurrentMessage(e.target.value)}
                value={currentMessage}
            />
            <button>Send</button>
        </form>
    )
}

  
export default Chat;