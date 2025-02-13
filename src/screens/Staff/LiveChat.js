import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './StaffStyle/LiveChat.module.css';
import ProfileIcon from '../TECHNICIAN/images/profile_icon.png';
import { useNavigate } from "react-router-dom";

function LiveChat({ onClose, selectedIssue }) {
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const userId = userInfo?.userId || 0;
  const staffName = userInfo?.name || "You";

  const [text, setText] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const navigate = useNavigate();
  const [connection, setConnection] = useState(null);

  // Extract logId from the selected issue
  const logId = selectedIssue?.logId || null;

  useEffect(() => {
    if (!logId) {
      console.error("⚠️ No logId found for the selected issue.");
      toast.error("No logId found! Unable to start chat.");
      return;
    }

    const connectToSignalR = async () => {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:44328/chatHub")
        .withAutomaticReconnect()
        .build();

      try {
        await newConnection.start();
        console.log("✅ Connected to SignalR");

        await newConnection.invoke("JoinLogChat", parseInt(logId));
        console.log(`✅ Joined Chat for logId: ${logId}`);

        // Listen for incoming messages
        newConnection.on("ReceiveMessage", (logId, senderId, message, timestamp) => {
          setChatLog(prevChat => [
            ...prevChat,
            {
              senderId,
              text: message,
              time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
        });

        setConnection(newConnection);
      } catch (err) {
        console.error("❌ Connection failed:", err);
        toast.error("Chat connection failed.");
      }
    };

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`https://localhost:44328/api/LiveChat/GetMessages/${logId}`);
        if (response.ok) {
          const messages = await response.json();
          const formattedMessages = messages.map(msg => ({
            senderId: msg.senderId,
            text: msg.message,
            time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }));
          setChatLog(formattedMessages);
          console.log("✅ Chat history loaded!", formattedMessages);
        } else {
          console.error("❌ Failed to fetch chat history.");
          toast.error("Error loading chat history.");
        }
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
        toast.error("Failed to load chat messages.");
      }
    };

    connectToSignalR();
    fetchChatHistory();

    return () => {
      if (connection && connection.state === signalR.HubConnectionState.Connected) {
        connection.stop()
          .then(() => console.log("🔴 Disconnected from chat"))
          .catch(err => console.error("❌ Error disconnecting:", err));
      }
    };
  }, [logId]);

  const handleSendText = async () => {
    if (text.trim() === '') {
      toast.warning("⚠️ Cannot send an empty message!");
      return;
    }

   // const token = userInfo?.token; // Ensure token is stored in user_info

    try {
      const response = await fetch("https://localhost:44328/api/LiveChat/SendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logId: logId,
          senderId: userId,
          message: text,
        }),
    
      });

      console.log();

      if (response.ok) {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setChatLog(prev => [
          ...prev,
          { logId, senderId:userId, message:text , currentTime},
        ]);
        setText('');
        toast.success("✅ Message sent!");
      } else {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        toast.error(errorData.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      toast.error("Network error. Check your connection.");
    }
  };

  return (
    <div className={styles.mainContainerChat}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <h4 className={styles.technicianName}>
            <img src={ProfileIcon} alt="Profile" height={45} /> {staffName}
          </h4>
          <div className={styles.icon} onClick={onClose}>
            <h1 className={styles.closeIcon}>x</h1>
          </div>
        </div>

        <div className={styles.chatBox}>
          <div className={styles.texts}>
            {chatLog.map((msg, index) => (
              <div key={index} className={msg.senderId === userId ? styles.userMessage : styles.techMessage}>
                <p>{msg.text}</p>
                <span className={styles.timeStamp}>{msg.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.messageField}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
          />
          <button className={styles.sendButton} onClick={handleSendText}>
            Send
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LiveChat;