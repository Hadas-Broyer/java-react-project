// src/components/Chat.js
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchChatById, fetAddChat } from '../features/chat/chatSlice';
import { useNavigate, useParams } from "react-router-dom";
import { fetchProfessionalById } from '../features/Professional/ProfessionalSlice';
import { unwrapResult } from '@reduxjs/toolkit';


const Chat = () => {
    const dispatch = useDispatch();
    const { chats, loading, error } = useSelector((state) => state.chat);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [the1, setThe1] = useState(null);
    const { id } = useParams();
    console.log("idididid", id);
    const userId = localStorage.getItem('userId');
    const userId2 = JSON.parse(userId);

    console.log("userId", userId2.id);
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const actionResult = await dispatch(fetchProfessionalById(id));
                    unwrapResult(actionResult);
                    console.log("actionResultactionResult", actionResult.payload);
                    setThe1(actionResult.payload);
                } catch (err) {
                    console.error("Error fetching professional:", err);
                }
            }
        };
        fetchData();
    }, [dispatch, id]);

    console.log("the1", the1);
    useEffect(() => {
        dispatch(fetchChatById(userId2.id));
    }, [dispatch]);

    console.log("chats", chats);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            const chatData = {
                senderId: userId2.id,  // מזהה השולח מה-localStorage
                theProfessionalId: the1 ? the1.id : null,  // מזהה בעל המקצוע שנשלף
                message: message,
                timestamp: new Date().toISOString(),  // זמן ההודעה
            };

            dispatch(fetAddChat(chatData));
            setMessage(''); // לנקות את שדה הקלט לאחר שליחה
        }
    };

    return (
        <div>
            <button onClick={toggleChat} style={{ position: 'fixed', right: 20, bottom: 20 }}>
                {isOpen ? 'סגור' : 'צאט'}
            </button>
            {isOpen && (
                <div style={{ position: 'fixed', right: 20, bottom: 70, width: '300px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                    <h3>צ'אט</h3>
                    {loading && <p>טוען...</p>}
                    {error && <p>שגיאה: {error}</p>}
                    <ul>
                        {chats.map((chat) => (
                            <li key={chat.id}>{chat.message}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage}>שלח</button>
                </div>
            )}
        </div>
    );
};
export default Chat;
