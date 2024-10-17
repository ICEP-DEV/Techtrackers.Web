import React, { useState, useRef, useEffect } from 'react'
import { Send, ArrowLeft, Paperclip ,UserCircleIcon} from 'lucide-react'
import PropTypes from 'prop-types'

const initialMessages = [
  {
    id: 1,
    sender: 'Lunga Ntshingila',
    content: "Hello, I've received your issue about the printer in Building 18. The picture you attached is not clear enough, could you please send the clear screenshot of the error message displayed on the screen ?",
    timestamp: '12:34',
    attachment: null
  },
  {
    id: 2,
    sender: 'User',
    content: 'Here is an error code displayed on the screen.',
    timestamp: '12:36',
    attachment: {
      name: 'error_screenshot.png',
      url: '/placeholder.svg?height=100&width=100'
    }
  },
  {
    id: 3,
    sender: 'Lunga Ntshingila',
    content: "It looks like a driver issue based on the error code. I'll reset the drivers remotely and let you know once it's done. Thank You",
    timestamp: '12:37',
    attachment: null
  }
]

function LiveChat({ onClose }) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [attachment, setAttachment] = useState(null)
  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' || attachment) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'User',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachment: attachment
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
      setAttachment(null)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setAttachment({
        name: file.name,
        url: URL.createObjectURL(file)
      })
    }
  }

  const handleAttachmentClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="live-chat-fullscreen">
      <div className="chat-header">
        <button className="back-button" onClick={onClose}>
          <ArrowLeft size={30} />
        </button>
        <h2><UserCircleIcon size={40}/>Lunga Ntshingila</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === 'User' ? 'user' : 'staff'}`}>
            <div className="message-content">
              {message.content}
              {message.attachment && (
                <div className="attachment-preview">
                  <img src={message.attachment.url} alt={message.attachment.name} />
                  <span>{message.attachment.name}</span>
                </div>
              )}
            </div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button className="attachment-button" onClick={handleAttachmentClick}>
          <Paperclip size={20} />
        </button>
        <button onClick={handleSendMessage}>
          <Send size={20} />
        </button>
      </div>
      {attachment && (
        <div className="attachment-preview">
          <img src={attachment.url} alt={attachment.name} />
          <span>{attachment.name}</span>
          <button onClick={() => setAttachment(null)}>Remove</button>
        </div>
      )}
    </div>
  )
}

LiveChat.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default LiveChat