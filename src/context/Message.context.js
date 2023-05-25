import React, { createContext, useEffect, useState, useContext } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getNotifications } from "../services/NotificationService";
import { getChat, getChats } from "../services/ChatService";
import { AuthContext } from "./auth.context";

let stompClient = null;
const websocketUrl = "http://localhost:8080/api/ws";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      connect();
      Promise.all([getNotifications()]).then(([notificationList]) => {
        if (notificationList && notificationList.length > 0)
          setNotifications(notificationList);
      });
    }
    else disconnect();
  }, [user]);

  const connect = () => {
    if (!stompClient) {
      const socket = new SockJS(websocketUrl);
      stompClient = Stomp.over(socket);
      stompClient.debug = null;
      stompClient.connect({}, onConnected, (err) => console.log(err));
    }
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect();
    }
  };

  const onConnected = () => {
    console.log("Connected to STOMP server");
    stompClient.subscribe("public/messages", onPublicMessageReceived);
    stompClient.subscribe(`user/${user.id}/messages`, onPrivateMessageReceived);
    stompClient.subscribe("public/notifications", onPublicNotificationReceived);
    stompClient.subscribe(
      `user/${user.id}/notifications`,
      onPrivateNotificationReceived
    );
  };

  const onPublicMessageReceived = (payload) => {
    const chatMessage = JSON.parse(payload.body);
    console.log(chatMessage);
    setPublicChats((prev) => [...prev, chatMessage]);
  };

  const onPublicNotificationReceived = (payload) => {
    const msg = JSON.parse(payload.body);
    console.log(msg);
  };

  const onPrivateMessageReceived = (payload) => {
    const chatMessage = JSON.parse(payload.body);
    // console.log(chatMessage)
    let chat = privateChats.find((chat) => chat.id === chatMessage.chatId);
    if (chat) {
      chat.chatMessages.push(chatMessage);
      setPrivateChats((prev) => [...prev, chat]);
    } else {
      getChat(chatMessage.chatId).then((res) => {
        console.log(res);
        console.log(privateChats);
        setPrivateChats((prev) => [...prev, chat]);
      });
    }
  };

  const onPrivateNotificationReceived = (payload) => {
    const notification = JSON.parse(payload.body);
    console.log(notification);
    setNotifications((prev) => [...prev, notification]);
  };

  const sendPublicMessage = (msg) => {
    stompClient.send(`app/chats/public`, {}, JSON.stringify(msg));
  };

  const sendPrivateMessage = (msg) => {
    stompClient.send(`app/chats/private`, {}, JSON.stringify(msg));
  };

  const sendPrivateNotification = (notification) => {
    stompClient.send(
      `app/notifications/private`,
      {},
      JSON.stringify(notification)
    );
  };

  return (
    <MessageContext.Provider
      value={{
        connect,
        publicChats,
        setPublicChats,
        privateChats,
        setPrivateChats,
        notifications,
        sendPublicMessage,
        sendPrivateMessage,
        sendPrivateNotification,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
