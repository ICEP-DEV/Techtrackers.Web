import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './StaffStyle/LiveChat.module.css';
import ProfileIcon from '../TECHNICIAN/images/profile_icon.png';
import AttachmentIcon from '../TECHNICIAN/images/attachment_icon.png';
import { useNavigate } from "react-router-dom";

function LiveChat() {
    const staffName = "Samuel Mahlangu";  // Replaced technicianName with staffName
    const [text, setText] = useState('');
    
    // Updated chatLog with your new message structure
    const [chatLog, setChatLog] = useState([
        { text: "Morning, can you please help fix the issue I am facing?", sender: "Lunga Ntshingila", time: "10:00", attachment: null },
        { text: "Hello, I've received your issue about the printer in Building 18. The picture you attached is not clear enough, could you please send the clear screenshot of the error message displayed on the screen?", sender: "Samuel Mahlangu", time: "12:34", attachment: null },
        { text: "Here is an error code displayed on the screen.", sender: "Samuel Mahlangu", time: "12:36", attachment: { name: 'error_screenshot.png', url: '/placeholder.svg?height=100&width=100' } },
        { text: "It looks like a driver issue based on the error code. I'll reset the drivers remotely and let you know once it's done. Thank you.", sender: "Lunga Ntshingila", time: "12:37", attachment: null }
    ]);
    
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    
    const handleCancelBtn = () => {
        navigate(-1);
    };

    const handleSendText = () => {
        if (text.trim() !== '') {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setChatLog([...chatLog, { text: text, sender: "You", time: currentTime, attachment: null }]);
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
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Toast to notify user the file is attached
            toast.success(`Attached: ${file.name}`);
            
            // Update chatLog with the attached image
            setChatLog([...chatLog, { text: fileURL, sender: "You", type: "image", fileName: file.name, time: currentTime }]);
        }
    };

    return (
        <div className={styles.mainContainerChat}>
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                    <div className={styles.name}>
                        <h4 className={styles.technicianName}>
                            <img src={ProfileIcon} alt="Profile" height={45}/> 
                            {staffName}
                        </h4>
                    </div>                    
                    <div className={styles.icon} onClick={handleCancelBtn}>
                        <h1 className={styles.closeIcon}>x</h1>
                    </div>
                </div>
                <div className={styles.chatBox}>
                    <div className={styles.texts}>
                        {chatLog.map((msg, index) => (
                            <div key={index} className={msg.sender === "You" ? styles.userMessage : styles.techMessage}>
                                {msg.attachment ? (
                                    // If there is an image attached, render the image preview
                                    <a href={msg.attachment.url} target="_blank" rel="noopener noreferrer">
                                        <img 
                                            src={msg.attachment.url} // Using the URL of the attached image for preview
                                            alt={msg.attachment.name} 
                                            style={{ maxWidth: '180px', maxHeight: '150px', borderRadius: '10px' }} 
                                        />
                                    </a>
                                ) : msg.type === "image" ? (
                                    // If the message is of type image, use the Blob URL to display the image
                                    <a href={msg.text} target="_blank" rel="noopener noreferrer">
                                        <img 
                                            src={msg.text} // Blob URL for preview
                                            alt={msg.fileName} 
                                            style={{ maxWidth: '80px', maxHeight: '80px', borderRadius: '5px' }} 
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

export default LiveChat;
