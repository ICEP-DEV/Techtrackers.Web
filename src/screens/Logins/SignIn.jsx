import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './LoginsStyle/SignIn.css';

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    // Hardcoded users
    const users = [
        { email: "kekana@gmail.com", password: '123zxc@Z', role: 'staff' },
        { email: 'nkosana@gmail.com', password: '123zxc@Z', role: 'technician' },
        { email: 'admin@example.com', password: '123Admin!', role: 'admin' },
        { email: 'hod@example.com', password: 'hodPass@123', role: 'hod' },
    ];

    const login = () => {
        // Find the user with matching email and password
        const user = users.find(u => u.email === Email && u.password === Password);

        if (user) {
            // Role-based navigation
            if (user.role === 'staff') {
                navigate('/staffdashboard/WelcomeStaff');
            } else if (user.role === 'technician') {
                navigate('/techniciandashboard');
            } else if (user.role === 'admin') {
                navigate('/admindashboard');
            } else if (user.role === 'hod') {
                navigate('/hoddashboard');
            }
            toast.success(`You are now logged in as ${user.role}`);
        } else {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="signin-cup">
            <ToastContainer />
            <Header />
            <div className="signin-cover">
                <div className="signin-cot">
                    <div className="user-iconic">
                        <img src={require('../../Images/user.jpg')} alt="User Icon" />
                    </div>
                    <h2 className="welcome">Welcome</h2>
                    <p className="words">Please enter your details</p>
                    <div className="form-grp">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-ctrl"
                            style={{ backgroundColor: 'white' }}
                        />
                    </div>
                    <div className="form-grp password-grp">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                            className="form-ctrl"
                            style={{ backgroundColor: 'white' }}
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button className="signin-btn" onClick={login}>Sign In</button>
                    <div className="forgot-pwd">
                        <Link to="/ForgotPassword" className="forg-link">Forgot Password? Click here</Link>
                    </div>
                </div>
                <div className="image-section">
                    <img src={require('../../Images/background.jpg')} alt="Background" />
                </div>
            </div>
        </div>
    );
}

export default SignIn;
