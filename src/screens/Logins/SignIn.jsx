import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './LoginsStyle/SignIn.css';
import axios from "axios";
import { api } from "../../APIs/API";

function SignIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Temporarily hardcoded role for testing purposes
    const role = location.state?.role || 'Staff';

    const user = [
        { email: "kekana@gmail.com", password: '123zxc@Z', role: 'Staff' },
        { email: 'nkosana@gmail.com', password: '123zxc@Z', role: 'Technician' },
    ];

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const login = () => {
        var data ={Email,Password}
        axios.post(api+'TechTrackers/UserLogin',data).then(respond=>{
            console.log(respond.data)
            if(respond.data.success){
                console.log(respond.data);

                if(respond.data.result.role==='staff'){
                    navigate('/staffdashboard');
                }

                if(respond.data.result.role==='technician'){
                    toast('you are now logged as '+respond.data.result.role)
                }

                if(respond.data.result.role==='admin'){
                    toast('you are now logged as '+respond.data.result.role)
                }

                if(respond.data.result.role==='hod'){
                    toast('you are now logged as '+respond.data.result.role)
                }

            }else{
                toast.warn("User not found or incorrect role");
            }
        },error=>{console.log(error)})
        
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
                        <Link to="/ForgotPassword" className="forg-link">Forgot Password? <a href="#">Click here</a></Link>
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
