import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function ForgotPassword() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    function submit() {
        if (Email === '') {
            alert('Enter your email');
            return;
        }
        var emailValidation = /\S+@\S+\.\S+/;
        if (!Email.match(emailValidation)) {
            alert('Enter a valid email address');
            return;
        }
        if (Password === '') {
            alert('Enter a new password');
            return;
        }
        if (ConfirmPassword === '') {
            alert('Confirm your new password');
            return;
        }
        if (Password !== ConfirmPassword) {
            alert('Passwords do not match');
            return;
        }

        var data = { Email, Password };
        console.log('Password reset successful', data);
        // Make API call to reset the password here
        navigate('/login');
    }
    return (
        <div>
            <Header />
            <div className="container2">
                <h2>Reset Password</h2>
                <div className="form-group">
                    <input type="text" placeholder="Email" onChange={(event) => setEmail(event.target.value)} className="control-form" />
                </div>
                <div className="form-group">
                    
                    <input type="password"placeholder="New Password" onChange={(event) => setPassword(event.target.value)} className="control-form" />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm New Password"onChange={(event) => setConfirmPassword(event.target.value)} className="control-form" />
                </div>
                <div className="form-group">
                    <button onClick={submit}>Reset Password</button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;