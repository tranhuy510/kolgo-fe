import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { getUserById, getUsers } from "../../services/UserService";
import { createChat, getChats } from "../../services/ChatService";
import classes from "./Chat.module.css";
import { useLocation } from "react-router";
import { formatDate } from '../../services/DateTimeUtil';

let stompClient = null;
const websocketEndpoint = "http://localhost:8080/api/ws";
const appPrefix = "app";

const Chat = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { state } = useLocation();
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [searchInput, setSearchInput] = useState("");
  const [tab, setTab] = useState("PUBLIC");
  const [chatMessage, setChatMessage] = useState({
    user: user,
    timestamp: "",
    content: "",
    chatId: ""
  });

  const [message, setMessage] = useState({
    type: "",
    body: "",
    senderId: user.id,
    receiverIds: []
  });

  useEffect(() => {
    Promise.all([
      getChats(),
    ]).then(([chats]) => {
      console.log('PRIVATE CHATS', chats)
      const chatMap = new Map();
      if (chats.length > 0) {
        console.log('SET NEW CHAT MAP')
        chats.forEach(chat => chatMap.set(chat.id, chat))
        setPrivateChats(chatMap);
      }

      if (state.user && state.user.id) {
        console.log(state.user, state.user.id)
        const chat = chats.find(chat => chat.type === 'PRIVATE' && chat.users[0]?.id === state.user.id);
        console.log(chat)

        if (chat) {
          console.log('SETTING TAB')
          setTab(chat.id)
        }
        else {
          console.log('CHAT NOT FOUND');
          console.log('CREATING NEW CHAT')
          privateChats.set(0, {
            id: 0,
            type: 'PRIVATE',
            date: formatDate(new Date()),
            user: user,
            users: [state.user],
            messages: []
          })
          setPrivateChats(prev => new Map([...privateChats]));
          // createNewChat([user.id, state.user.id]);
        };
      }
    });

    // const currentUser = JSON.parse(localStorage.getItem("user"));
    // setMessage((prev) => ({ ...prev, senderId: currentUser.id }));

    connect();
  }, []);

  useEffect(() => {
    console.log("current tab", tab)
  }, [tab]);

  const createNewChat = (ids) => {
    createChat({
      type: "PRIVATE",
      date: formatDate(new Date()),
      userId: user.id,
      userIds: [...ids]
    }).then(res => {
      console.log(res);
    })
  }

  const connect = () => {
    if (!stompClient) {
      const sock = new SockJS(websocketEndpoint);
      stompClient = over(sock);
      stompClient.connect({}, onConnected, err => console.log(err));
    }
  };

  const onConnected = () => {
    stompClient.subscribe("public/messages", onPublicMessageReceived);
    stompClient.subscribe(`user/${user.id}/messages`, onPrivateMessageReceived);
  };

  const onPublicMessageReceived = (payload) => {
    const msg = JSON.parse(payload.body);
    console.log(JSON.parse(msg.body))
    setPublicChats((prev) => [...prev, JSON.parse(msg.body)]);
  };

  const onPrivateMessageReceived = (payload) => {
    let msg = JSON.parse(payload.body);
    if (!privateChats.has(msg.conversationId)) {
      privateChats.set(msg.conversationId, {
        id: msg.conversationId,
        conversationType: msg.conversationType,
        receiverId: msg.authorId,
        receiverFirstName: msg.authorFirstName,
        receiverLastName: msg.authorLastName,
        messages: [msg],
      });
      setPrivateChats((prev) => new Map([...prev, ...privateChats]));
    } else {
      let convo = privateChats.get(msg.conversationId);
      convo.messages.push(msg);
      setPrivateChats((prev) => new Map([...prev, [convo.id, convo]]));
    }
  };

  const sendMessage = (e) => {
    if (chatMessage.content) {
      chatMessage.timestamp = formatDate(new Date());
      message.type = 'MESSAGE';
      message.body = JSON.stringify(chatMessage);

      if (tab === "PUBLIC") sendPublicMessage();
      else sendPrivateMessage();

      setChatMessage((prev) => ({ ...prev, timestamp: "", content: "" }));
    }
    e.preventDefault();
  };

  const sendPublicMessage = () => {
    stompClient.send(`${appPrefix}/public`, {}, JSON.stringify(message));
  };

  const sendPrivateMessage = () => {
    // TODO: if msg.conversationId == 0, post data to server
    // server response conversation id
    stompClient.send(
      `${appPrefix}/private`, {},
      JSON.stringify({
        ...message,
        conversationId: tab,
        receiverId: privateChats.get(tab).receiverId,
      })
    );

    let currentUser = JSON.parse(localStorage.getItem("user"));
    let convo = privateChats.get(tab);
    convo.messages.push({
      authorId: currentUser.id,
      authorFirstName: currentUser.firstName,
      authorLastName: currentUser.lastName,
      messageType: message.type,
      content: message.content,
      timestamp: message.timestamp,
      conversationId: message.conversationId,
    });

    setPrivateChats((prev) => new Map([...prev, [convo.id, convo]]));
  };

  return (
    <>
      {/* Flex Container */}
      <div className={classes.messenger}>
        {/* Conversation List */}
        <ul className={classes["conversation-list"]}>
          {/* Search Box */}
          <div className="search-box">
            <input
              type="text"
              className={classes["search-input"]}
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {/* Receiver List */}
          {/* Public Room */}
          <li
            onClick={() => setTab("PUBLIC")}
            className={`${classes["conversation-list-item"]} ${tab === "PUBLIC" && classes["active"]}`}
          >
            Public Chat
          </li>
          {/* Private Receivers */}
          {privateChats.size > 0 && [...privateChats.values()].map((chat, index) => (
            <li
              onClick={() => setTab(chat.id)}
              className={`${classes['conversation-list-item']}`} key={index}>
              {chat.users[0].firstName} {chat.users[0].lastName}
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
                  {msg.user.firstName} {msg.user.lastName}: {msg.content}
                </li>
              ))}
            {tab !== "PUBLIC" &&
              privateChats.has(tab) &&
              privateChats.get(tab).messages.map((msg, index) => (
                <li className={classes["message-list-item"]} key={index}>
                  {msg.user.firstName} {msg.user.lastName}: {msg.content}
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
