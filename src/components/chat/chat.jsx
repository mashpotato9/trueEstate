import { authContext } from '../../context/authContext';
import './chat.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { format } from 'timeago.js';
import { socketContext } from '../../context/socketContext';
import { useStore } from '../../lib/notificationstore';

function Chat({ data }) {
    const [chat, setChat] = useState(null);
    const { currUser } = useContext(authContext);
    const { socket } = useContext(socketContext);
    const centerRef = useRef();

    const decrease = useStore(state => state.decrease)

    useEffect(() => {
        if (chat?.messages) {
            centerRef.current?.scrollTo({
                top: centerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [chat?.messages]);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest.get(`/chats/${id}`);
            if (!res.data.seenBy.includes(currUser.userInfo.id)) {
                decrease()
            }
            setChat({ ...res.data, receiver });
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get('text');
        if (!text) return;
        try {
            const res = await apiRequest.post(`/messages/${chat.id}`, { content: text });
            setChat(prev => ({ ...prev, messages: [...prev.messages, res.data] }));
            e.target.reset();
            socket.emit('sendMessage', {
                receiverId: chat.receiver.id,
                data: res.data
            });
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {

        const read = async () => {
            try {
                await apiRequest.put(`/chats/read/${chat.id}`);
            } catch (err) {
                console.error(err)
            }
        }

        if (chat && socket) {
            socket.on('getMessage', (data) => {
                if (chat.id === data.chatId) {
                    setChat(prev => ({ ...prev, messages: [...prev.messages, data] }));
                    read();
                }
            });
        }
        return () => {
            socket.off("getMessage");
        };
    }, [chat && socket])

    return (
        <div className="chat">
            <div className="messages">
                <h1>Message</h1>
                {data?.map((c) => (
                    <div className="message" key={c.id}
                        style={
                            {
                                backgroundColor: c.seenBy.includes(currUser.userInfo.id) || chat?.id === c.id
                                    ? 'white'
                                    : '#fecd514e'
                            }
                        }
                        onClick={() => handleOpenChat(c.id, c.receiver)}
                    >
                        <img src={c.receiver.avatar || '/noavatar.png'} alt="" />
                        <span>{c.receiver.username}</span>
                        <p>{c.lastMsg}</p>
                    </div>
                )
                )}

            </div>
            {chat && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img src={chat.receiver.avatar || "/noavatar.png"} alt="" />
                            <span>{chat.receiver.username}</span>
                        </div>
                        <span className='close' onClick={() => setChat(null)}>X</span>
                    </div>
                    <div className="center" ref={centerRef}>
                        {chat.messages.map((msg) => (
                            <div className="chatMessage"
                                style={{
                                    alignSelf: msg.userId === currUser.userInfo.id ? 'flex-end' : 'flex-start',
                                    textAlign: msg.userId === currUser.userInfo.id ? 'right' : 'left'
                                }}
                                key={msg.id}>
                                <p>{msg.content}</p>
                                <span>{format(msg.createdAt)}</span>
                            </div>
                        ))}
                    </div>
                    <form className="bottom" onSubmit={handleSubmit}>
                        <textarea name="text" placeholder="Write your message..."></textarea>
                        <button>Send</button>
                    </form>
                </div>)}
        </div>
    )
}

export default Chat