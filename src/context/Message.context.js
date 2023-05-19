import React, { createContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getNotification } from "../services/NotificationService"

let stompClient = null;
const websocketUrl = 'http://localhost:8080/api/ws';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [chatMessages, setChatMessages] = useState([]);
    const [notifications, setNotification] = useState([]);

    useEffect(() => {
        Promise.all([
            getNotification(),
        ]).then(([notificationList]) => {
            setNotification(notificationList);
        })
    }, [])

    useEffect(() => {
        if (user) connect();
        else disconnect();
        const handleStorageChange = () => {
            setUser({ ...JSON.parse(localStorage.getItem("user")) });
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [user]);

    const connect = () => {
        if (!stompClient) {
            const socket = new SockJS(websocketUrl);
            stompClient = Stomp.over(socket);
            stompClient.debug = null;
            stompClient.connect({}, onConnected, (err) => console.log(err));
        }
    }

    const disconnect = () => {
        if (stompClient) {
            stompClient.disconnect();
        }
    }

    const onConnected = () => {
        console.log("Connected to STOMP server");
        stompClient.subscribe("public/messages", onPublicMessageReceived);
        stompClient.subscribe(`user/${user.id}/messages`, onPrivateMessageReceived);
    }

    const onPublicMessageReceived = (payload) => {
        const msg = JSON.parse(payload.body);
    }

    const onPrivateMessageReceived = (payload) => {
        const msg = JSON.parse(payload.body);
        console.log(msg)
        if (msg.type === 'NOTIFICATION') {
            setNotification(prev => [...prev, msg.notification])
        }

        if (msg.messageType === 'CHAT_MESSAGE')
            setChatMessages(prev => [...prev, msg.chatMessage]);
    }

    const sendPublicMessage = (msg) => {
        stompClient.send(`app/public`, {}, JSON.stringify(msg));
    }

    const sendPrivateMessage = (msg) => {
        stompClient.send(`app/private`, {}, JSON.stringify(msg))
    }

    return (
        <MessageContext.Provider value={{
            chatMessages,
            notifications,
            sendPublicMessage,
            sendPrivateMessage
        }}>
            {children}
        </MessageContext.Provider>
    );
};
