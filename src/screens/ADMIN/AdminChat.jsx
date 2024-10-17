import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/AdminChatStyle.css';
import ProfileIcon from '../images/profile_icon.png';
import AttachmentIcon from '../images/attachment_icon.png';

function AdminChat() {
    const technicianName = "Samuel Mahlangu"; 
    const [text, setText] = useState('');
    const [chatLog, setChatLog] = useState([
        { text: "Please avail yourself tomorrow at 10am. I will come and have a look at your PC.", sender: "Technician", time: "10:00" }
    ]);
    const fileInputRef = useRef(null);

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
        <div className="main-container">
            <div className="chat-container">
                <h4 className="technician-name"><img src={ProfileIcon} alt="Profile" height={45}/> {technicianName}</h4>
                <div className="chat-box">
                    <div className="texts">
                        {chatLog.map((msg, index) => (
                            <div key={index} className={msg.sender === "You" ? "user-message" : "tech-message"}>
                                {msg.type === "image" ? (
                                    <img src={msg.text} alt={msg.fileName} style={{ maxWidth: '100%', borderRadius: '10px' }} />
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

export default AdminChat;
