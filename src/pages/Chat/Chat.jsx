import React, { useContext, useEffect, useState } from "react";
import { getUserById, getUsers } from "../../services/UserService";
import { createChat, getChats } from "../../services/ChatService";
import classes from "./Chat.module.css";
import { useLocation } from "react-router";
import { formatDate } from "../../services/DateTimeUtil";
import { MessageContext } from "../../context/Message.context";

const Chat = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { state } = useLocation();
  const {
    publicChats,
    privateChats,
    setPrivateChats,
    sendPublicMessage,
    sendPrivateMessage } = useContext(MessageContext);
  const [tab, setTab] = useState("PUBLIC");
  const [chatId, setChatId] = useState(0);
  const [receivers, setReceivers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState({
    type: 'CHAT_MESSAGE',
    timestamp: "",
    content: "",
    userId: user.id,
    userFirstName: user.firstName,
    userLastName: user.lastName,
    userAvatar: user.avatar,
    chatId: "",
  });

  useEffect(() => {
    getChats()
      .then(res => {
        const receiverList = getReceiverList(res);
        validateChatExistence(state, receiverList);
        setPrivateChats(res)
      });
  }, []);

  useEffect(() => {
    if (privateChats && privateChats.length > 0) {
      const chat = privateChats.find(c => c.id === chatId);
      if (chat && chatId === chat.id) {
        setChatMessages(chat.chatMessages);
      }
    }
  }, [privateChats])

  useEffect(() => {
    console.log(tab)
    if (tab !== 'PUBLIC' && privateChats.length > 0) {
      const chat = privateChats.find(chat => chat.users[0].id === tab || chat.users[1].id === tab);
      setChatMessages(chat.chatMessages);
      setChatId(chat.id);
    }
  }, [tab])

  const getReceiverList = (chats) => {
    let receiverList;
    if (chats.length > 0) {
      receiverList = chats.map(chat => {
        if (chat.users[0].id !== user.id) return chat.users[0];
        return chat.users[1];
      });
      setReceivers(receiverList);
    }
    return receiverList;
  }

  const validateChatExistence = (kol, receiverList) => {
    console.log(kol)
    if (state) {
      let chat;
      if (receiverList.length > 0) chat = receiverList.find(receiver => receiver.id === kol.userId);

      if (chat)
        setTab(chat.id)
      else
        createChat({ type: 'PRIVATE', timestamp: formatDate(new Date()), userIds: [user.id, state.userId] })
          .then(res => setPrivateChats(prev => [...prev, res]));
    }

  }

  const sendMessage = (e) => {
    e.preventDefault();
    chatMessage.timestamp = formatDate(new Date());
    if (tab === 'PUBLIC') {
      sendPublicMessage(chatMessage);
    }
    else {
      console.log("send private message to user with id ", tab)

      chatMessage.chatId = chatId;
      console.log(chatMessage);
      sendPrivateMessage(chatMessage);
    }
    setChatMessage(prev => ({ ...prev, content: '', timestamp: '' }))
  }

  return (
    <>
      {/* Flex Container */}
      <div className={classes.messenger}>
        {/* Conversation List */}
        <ul className={classes["conversation-list"]}>
          {/* Receiver List */}
          {/* Public */}
          <li
            onClick={() => setTab("PUBLIC")}
            className={`${classes["conversation-list-item"]} ${tab === "PUBLIC" && classes["active"]
              }`}
          >
            Public Chat
          </li>
          {/* Private Receivers */}
          {receivers.length > 0 && receivers.map((usr, index) => (
            <li
              onClick={() => setTab(usr.id)}
              className={`${classes["conversation-list-item"]}`}
              key={index}
            >
              {usr.firstName} {usr.lastName}
            </li>

          ))}
        </ul>
        {/* End Receiver List */}
        <div className={classes["message-content"]}>
          <div className={classes["message-header"]}>Public Chat</div>
          {/* Message List */}
          <ul className={classes["message-list"]}>
            {tab === "PUBLIC" &&
              publicChats.map((msg, index) => (
                <li className={classes["message-list-item"]} key={index}>
                  {msg.userFirstName} {msg.userLastName}: {msg.content}
                </li>
              ))}
            {tab !== 'PUBLIC' && chatMessages.length > 0 && chatMessages.map((msg, index) => (
              <li className={classes["message-list-item"]} key={index}>
                {msg.userFirstName} {msg.userLastName}: {msg.content}
              </li>
            ))}
          </ul>
          {/* End Message List */}
          <form className={classes["send-message"]}>
            <input
              type="text"
              className={classes["message-input"]}
              placeholder="Enter the message"
              value={chatMessage.content}
              onChange={(e) =>
                setChatMessage((prev) => ({ ...prev, content: e.target.value }))
              }
            />
            <button
              type="submit"
              className={classes["send-button"]}
              onClick={(e) => sendMessage(e)}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
