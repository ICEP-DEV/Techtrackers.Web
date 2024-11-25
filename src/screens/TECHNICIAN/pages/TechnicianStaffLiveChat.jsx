import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../SidebarCSS/LiveChatStyle.module.css';
import ProfileIcon from '../images/profile_iconlivechat.png';
import AttachmentIcon from '../images/attachment_icon.png';
import { useNavigate } from "react-router-dom";

function TechncianLiveChat() {
    const staffName = "John Doe"; 
    const department = "Human Resources";
    const [text, setText] = useState('');
    const [chatLog, setChatLog] = useState([
        { text: "Hello, what time will you come to check the issue with my computer?", sender: "Staff", time: "10:00" }
    ]);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();
    
    const handleCancelBtn= () => {
        navigate(-1);
    }

    const handleSendText = () => {
        if (text.trim() !== '') {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setChatLog([...chatLog, { text: text, sender: "You", type: "text", time: currentTime }]);
            setText('');
        }
    };

    const handleAttachImage = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            const fileType = file.type.startsWith("image/") ? "image" : "file";
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            toast.success(`Attached: ${file.name}`);
            
            setChatLog([...chatLog, { text: fileURL, sender: "You", type: fileType, fileName: file.name, time: currentTime }]);
        }
    };

    return (
        <div className={styles.mainContainerChat}>
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                    <div className={styles.name}><h4 className={styles.staffName}>
                        <img src={ProfileIcon} alt="Profile" height={45}/> 
                        {staffName} - {department}</h4>
                    </div>
                    
                    <div clsassName={styles.icon} onClick={handleCancelBtn}><h1 className={styles.closeIcon}>x</h1></div>
                </div>
                <div className={styles.chatBox}>
                    <div className={styles.texts}>
                        {chatLog.map((msg, index) => (
                            <div key={index} className={
                                msg.sender === "You"
                                  ? styles.userMessage
                                  : styles.techMessage
                              }>
                            {msg.type === "image" ? (
                                <a href={msg.text} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        src={msg.text} 
                                        alt={msg.fileName} 
                                        style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '10px' }} 
                                    />
                                </a>
                            ) : (
                                <p>{msg.text}</p>
                            )}
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
                    <img 
                        src={AttachmentIcon} 
                        alt="Attach" 
                        onClick={handleAttachImage} 
                        height={45} 
                        className={styles.attachmentIcon} 
                    />
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                    />
                
                    <button className={styles.sendButton} onClick={handleSendText}>Send</button>
                    
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default TechncianLiveChat;
