import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LiveChatStyle.css';
import ProfileIcon from './icons/profile_icon.png';
import AttachmentIcon from './icons/attachment_icon.png';
import { useNavigate } from "react-router-dom";

function TechncianAdminChat() {
    const technicianName = "Samuel Mahlangu"; 
    const [text, setText] = useState('');
    const [chatLog, setChatLog] = useState([
        { text: "Hello, what time will you come to check the issue with my computer?", sender: "Technician", time: "10:00" }
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
        <div className="main-container-chat">
            <div className="chat-container">
                <div className="chat-header">
                    <div id='name'><h4 className="technician-name"><img src={ProfileIcon} alt="Profile" height={45}/> {technicianName}</h4></div>
                    <div id='icon' onClick={handleCancelBtn}><i className="fa-solid fa-xmark"></i></div>
                </div>
                <div className="chat-box">
                    <div className="texts">
                        {chatLog.map((msg, index) => (
                            <div key={index} className={msg.sender === "You" ? "user-message" : "tech-message"}>
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
                            <span className="time-stamp">{msg.time}</span>
                        </div>
                        
                        ))}
                    </div>
                </div>
                <div className="message-field">
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
                        className="attachment-icon" 
                    />
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                    />
                
                    <button className="send-button" onClick={handleSendText}>Send</button>
                    
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default TechncianAdminChat;
