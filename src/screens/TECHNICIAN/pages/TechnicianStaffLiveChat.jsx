import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../SidebarCSS/LiveChatStyle.module.css';
import ProfileIcon from '../images/profile_iconlivechat.png';
import { useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

function TechncianLiveChat() {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const userId = userInfo?.userId || 0;
    const staffName = userInfo?.name || "You";

    const [text, setText] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();
    const [connection, setConnection] = useState(null);
    const messagesEndRef = useRef(null); // Scroll to bottom

    const storedLogs = JSON.parse(localStorage.getItem("Tech Issues")) || [];
    const selectedIssueId = localStorage.getItem("selected_issue_id");
    const relevantLog = storedLogs.find(log => log.issueId === selectedIssueId);
    const logId = relevantLog ? relevantLog.logId : null;

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
                    setChatLog(messages.map(msg => ({
                        senderId: msg.senderId,
                        text: msg.message,
                        time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    })));
                } else {
                    toast.error("Error loading chat history.");
                }
            } catch (error) {
                toast.error("Failed to load chat messages.");
            }
        };

        connectToSignalR();
        fetchChatHistory();

        return () => {
            if (connection && connection.state === signalR.HubConnectionState.Connected) {
                connection.stop().catch(err => console.error("❌ Error disconnecting:", err));
            }
        };
    }, [logId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    const handleSendText = async () => {
        if (text.trim() === '') {
            toast.warning("⚠️ Cannot send an empty message!");
            return;
        }

        try {
            const response = await fetch("https://localhost:44328/api/LiveChat/SendMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ logId: parseInt(logId, 10), senderId: parseInt(userId, 10), message: text }),
            });

            if (response.ok) {
                setChatLog(prev => [
                    ...prev,
                    { senderId: userId, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                ]);
                setText('');
            } else {
                toast.error("Failed to send message.");
            }
        } catch (error) {
            toast.error("Network error.");
        }
    };

    return (
        <div className={styles.mainContainerChat}>
            <div className={styles.chatContainer}>
                {/* Chat Header */}
                <div className={styles.chatHeader}>
                    <h4 className={styles.technicianName}>
                        <img src={ProfileIcon} alt="Profile" height={45} className={styles.profileImage} /> {staffName}
                    </h4>
                    <div className={styles.closeIcon} onClick={() => navigate(-1)}>✖</div>
                </div>

                {/* Chat Messages */}
                <div className={styles.chatBox}>
                    <div className={styles.texts}>
                        {chatLog.map((msg, index) => (
                            <div key={index} className={msg.senderId === userId ? styles.userMessage : styles.techMessage}>
                                <p>{msg.text}</p>
                                <span className={styles.timeStamp}>{msg.time}</span>
                            </div>
                        ))}
                        {isTyping && <p className={styles.typingIndicator}>User is typing...</p>}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Field */}
                <div className={styles.messageField}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            setIsTyping(e.target.value.length > 0);
                        }}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendText()}
                    />
                    <button className={styles.sendButton} onClick={handleSendText}>📩</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default TechncianLiveChat;
