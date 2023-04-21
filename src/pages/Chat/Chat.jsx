import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { fetchData, postData } from "../../services/chat";
import "./Chat.css";
import { useLocation } from 'react-router';

let stompClient = null;
const websocketEndpoint = "http://localhost:8080/api/websocket";
const appPrefix = "chat";

const Chat = (props) => {
  const { state } = useLocation();
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map())
  const [userList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [tab, setTab] = useState("PUBLIC");
  const [message, setMessage] = useState({
    conversationId: "",
    senderId: "",
    receiverId: "",
    type: "",
    content: "",
    timestamp: ""
  });

  useEffect(() => {
    Promise.all([
      fetchData("users", true),
      fetchData("conversations", true),
    ]).then(([users, convoList]) => {
      setUserList(users);
    });

    const currentUser = JSON.parse(localStorage.getItem("user"));
    setMessage(prev => ({ ...prev, senderId: currentUser.id }));
    // setPrivateChats(new Map([[0, {
    //   id: 0,
    //   receiverFirstName: "Sang",
    //   receiverLastName: "Beo",
    //   messages: [
    //     { authorFirstName: "Sang", authorLastName: "Beo", content: "test content" }
    //   ]
    // }]]));

    connect();
  }, [])

  useEffect(() => {
    console.log(tab)
    if (privateChats.has(0)) {
      console.log(privateChats?.get(0).messages)
    }
  }, [tab])

  // const initCheck = () => {
  //   if (state && state.receiverId) {
  //     let convoExisted = [...convoList.values()].some(convo => convo.receiverId === state.receiverId);
  //     if (!convoExisted) {
  //       postData("conversations", {})
  //     }
  //   }
  // }

  const connect = () => {
    if (!stompClient) {
      const sock = new SockJS(websocketEndpoint)
      stompClient = over(sock)
      stompClient.connect({}, onConnected, onError)
    }
  }

  // const disconnect = () => {
  //   if (stompClient) {
  //     stompClient.disconnect();
  //   }
  //   setConnected(false);
  // }

  const onConnected = () => {
    subscribePublicChannel();
    subscribePrivateChannel();
  }

  const onError = (err) => {
    console.log(err)
  }

  const subscribePublicChannel = () => {
    stompClient.subscribe("public/messages", onPublicMessageReceived)
  }

  const subscribePrivateChannel = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    stompClient.subscribe(`user/${currentUser.id}/messages`, onPrivateMessageReceived)
  }

  const onPublicMessageReceived = (payload) => {
    const msg = JSON.parse(payload.body);
    setPublicChats(prev => [...prev, msg]);
  }

  const onPrivateMessageReceived = (payload) => {
    let msg = JSON.parse(payload.body);
    if (!privateChats.has(msg.conversationId)) {
      privateChats.set(msg.conversationId, {
        conversationId: msg.conversationId,
        authorId: msg.authorId,
        authorFirstName: msg.authorFirstName,
        authorLastName: msg.authorLastName,
        type: msg.type,
        content: msg.content,
        timestamp: msg.timestamp,
      })
    }
  }

  const sendMessage = (e) => {
    if (message.content) {
      let msg = {
        ...message,
        messageType: "MESSAGE",
        timestamp: new Date().toISOString()
      }
      if (tab === "PUBLIC") {
        sendPublicMessage(msg);
      } else {
        sendPrivateMessage(msg)
      }
      setMessage(prev => ({ ...prev, content: "" }));
    }
    e.preventDefault();
  }

  const sendPublicMessage = (msg) => {
    stompClient.send(`${appPrefix}/public`, {}, JSON.stringify({
      ...msg, conversationType: "PUBLIC"
    }));
  }

  const sendPrivateMessage = (msg) => {
    stompClient.send(`${appPrefix}/private`, {}, JSON.stringify({
      ...msg, conversationType: "PUBLIC"
    }));
  }

  return (
    <>
      {/* Flex Container */}
      <div className="messenger">
        {/* Conversation List */}
        <ul className="conversation-list">
          {/* Search Box */}
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {/* Receiver List */}
          <li onClick={() => setTab("PUBLIC")} className={`conversation-list-item ${tab === "PUBLIC" && "active"}`}>
            Public Chat
          </li>
          {[...privateChats.values()].map((convo, index) => (
            <li onClick={() => setTab(convo.id)} className={`conversation-list-item ${tab === convo.id && "active"}`} key={index}>
              {convo.receiverFirstName} {convo.receiverLastName}
            </li>
          ))}
        </ul>
        {/* End Receiver List */}
        <div className="message-content">
          {/* Message List */}
          <ul className="message-list">
            {tab === "PUBLIC" && publicChats.map((msg, index) => (
              <li className="message-list-item" key={index}>
                {msg.authorFirstName} {msg.authorLastName}: {msg.content}
              </li>
            ))}
            {tab !== "PUBLIC" && privateChats.has(tab) && privateChats.get(tab).messages.map((msg, index) => (
              <li className="message-list-item" key={index}>
                {msg.authorFirstName} {msg.authorLastName}: {msg.content}
              </li>
            ))}
          </ul>
          {/* End Message List */}
          <form className="send-message">
            <input
              type="text"
              className="message-input"
              placeholder="Enter the message"
              value={message.content}
              onChange={(e) => setMessage(prev => ({ ...prev, content: e.target.value }))}
            />
            <button
              type="submit"
              className="send-button"
              onClick={e => sendMessage(e)}>
              send
            </button>
          </form>

        </div>
      </div >
    </>
  )

};

export default Chat;