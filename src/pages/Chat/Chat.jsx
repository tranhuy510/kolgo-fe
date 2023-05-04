import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { fetchData, postData } from "../../services/common";
import classes from "./Chat.module.css";
import { useLocation } from "react-router";

let stompClient = null;
const websocketEndpoint = "http://localhost:8080/api/websocket";
const appPrefix = "chat";

const Chat = (props) => {
  const { state } = useLocation();
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [userList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [tab, setTab] = useState("PUBLIC");
  const [message, setMessage] = useState({
    conversationId: "",
    senderId: "",
    receiverId: "",
    type: "",
    content: "",
    timestamp: "",
  });

  useEffect(() => {
    Promise.all([
      fetchData("users", true),
      fetchData("conversations", true),
    ]).then(([users, convoList]) => {
      console.log("users", users);
      setUserList([...users]);
      console.log("private chats", convoList);
      // setPrivateChats([...convoList])
    });

    const currentUser = JSON.parse(localStorage.getItem("user"));
    setMessage((prev) => ({ ...prev, senderId: currentUser.id }));

    connect();
  }, []);

  useEffect(() => {
    checkConversationExistence();
  }, [userList]);

  useEffect(() => {
    // console.log("current tab", tab)
  }, [tab]);

  const checkConversationExistence = () => {
    if (state && state.receiverId) {
      const receiver = userList.find((u) => u.id === state.receiverId);
      if (receiver) {
        privateChats.set(0, {
          id: 0,
          conversationType: "PRIVATE",
          receiverId: receiver.id,
          receiverFirstName: receiver.firstName,
          receiverLastName: receiver.lastName,
          messages: [],
        });
        setPrivateChats((prev) => new Map([...prev, ...privateChats]));
        setTab(0);
      } else {
        const convo = [...privateChats.values()].find(
          (c) => c.receiverId === receiver.id
        );
        setTab(convo?.conversationId);
      }
    }
  };

  const connect = () => {
    if (!stompClient) {
      const sock = new SockJS(websocketEndpoint);
      stompClient = over(sock);
      stompClient.connect({}, onConnected, onError);
    }
  };

  // const disconnect = () => {
  //   if (stompClient) {
  //     stompClient.disconnect();
  //   }
  //   setConnected(false);
  // }

  const onConnected = () => {
    subscribePublicChannel();
    subscribePrivateChannel();
  };

  const onError = (err) => {
    console.log(err);
  };

  const subscribePublicChannel = () => {
    stompClient.subscribe("public/messages", onPublicMessageReceived);
  };

  const subscribePrivateChannel = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    stompClient.subscribe(
      `user/${currentUser.id}/messages`,
      onPrivateMessageReceived
    );
  };

  const onPublicMessageReceived = (payload) => {
    const msg = JSON.parse(payload.body);
    setPublicChats((prev) => [...prev, msg]);
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
    if (message.content) {
      setMessage((prev) => ({
        ...prev,
        type: "MESSAGE",
        timestamp: new Date().toISOString(),
      }));
      if (tab === "PUBLIC") sendPublicMessage();
      else sendPrivateMessage();

      setMessage((prev) => ({ ...prev, content: "" }));
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
      `${appPrefix}/private`,
      {},
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
            className={`${classes["conversation-list-item"]} ${
              tab === "PUBLIC" && classes["active"]
            }`}
          >
            Public Chat
          </li>
          {/* Private Receivers */}
          {[...privateChats.values()].map((convo, index) => (
            <li
              onClick={() => setTab(convo.id)}
              className={`conversation-list-item ${
                tab === convo.id && "active"
              }`}
              key={index}
            >
              {convo.receiverFirstName} {convo.receiverLastName}
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
                  {msg.authorFirstName} {msg.authorLastName}: {msg.content}
                </li>
              ))}
            {tab !== "PUBLIC" &&
              privateChats.has(tab) &&
              privateChats.get(tab).messages.map((msg, index) => (
                <li className={classes["message-list-item"]} key={index}>
                  {msg.authorFirstName} {msg.authorLastName}: {msg.content}
                </li>
              ))}
          </ul>
          {/* End Message List */}
          <form className={classes["send-message"]}>
            <input
              type="text"
              className={classes["message-input"]}
              placeholder="Enter the message"
              value={message.content}
              onChange={(e) =>
                setMessage((prev) => ({ ...prev, content: e.target.value }))
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
