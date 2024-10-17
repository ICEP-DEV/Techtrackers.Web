import React, { useState } from 'react';
// import '../ADMIN/styles/EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
    const [profileImage, setProfileImage] = useState(user?.profileImage || null);
    const [name, setName] = useState(user?.name || '');
    const [surname, setSurname] = useState(user?.surname || '');
    const [email, setEmail] = useState(user?.email || '');
    const [contact, setContact] = useState(user?.contact || '');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result); // Update profile image when user selects a new one
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null); // Allow image removal
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (!name || !surname || !email || !contact) {
            alert("All fields are required!");
            return;
        }

        const updatedUser = {
            ...user, // Retain existing user data
            name: name !== user.name ? name : user.name, // Only update if changed
            surname: surname !== user.surname ? surname : user.surname, // Update if changed
            email: email !== user.email ? email : user.email, // Update if changed
            contact: contact !== user.contact ? contact : user.contact, // Update if changed
            profileImage // Keep the updated or removed profile image
        };

        onSave(updatedUser); // Send updated user info to parent component
        onClose(); // Close modal

        alert("Profile updated successfully!");
    };

    if (!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <form onSubmit={handleSave}>
                    <div className='left-edit'>
                        <h3 className='title'>Edit Profile</h3>
                        <p id="user-role">{user?.role || 'Administrator'}</p>
                        <div className="form-group1">
                            <div className="profile-picture-container">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile Preview" className="profile-preview" />
                                ) : (
                                    <div className="no-profile-picture">No Image</div>
                                )}
                            </div>
                            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} />
                            {profileImage && (
                                <button 
                                    type="button" 
                                    onClick={handleRemoveImage} 
                                    className="remove-button"
                                >
                                    Remove Profile Image
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='right-edit'>
                        <div className="form-group">
                            <label htmlFor="name">First Name:</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Last Name:</label>
                            <input 
                                type="text" 
                                id="surname" 
                                value={surname} 
                                onChange={(e) => setSurname(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact:</label>
                            <input 
                                type="text" 
                                id="contact" 
                                value={contact} 
                                onChange={(e) => setContact(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={onClose} className="close-button">Close</button>
                        <button type="submit" className="save-button">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
