import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../LoginsStyle/SignIn.css';

function SignIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate hook
    const role = location.state?.role || 'User';

    const user = [
        { email: "kekana@gmail.com", password: '123zxc@Z', role: 'Staff' },
        { email: 'nkosana@gmail.com', password: '123zxc@Z', role: 'Technician' },
        // Add more users with roles if necessary
    ];

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const login = () => {
        var isFound = false;
        for (var k = 0; k < user.length; k++) {
            if (user[k].email === Email && user[k].role === role) {
                if(user[k].password === Password){ 
                    isFound = true;
                }
            }
        }

        if (isFound) {
            toast.success(`Login successful as ${role}`);
            setIsLoggedIn(true);
            navigate('/staffpagedisplay'); // Navigate to StaffPageDisplay after login
        } else {
            toast.warn("User not found or incorrect role");
        }
    };

    return (
        <div>
            <ToastContainer />
            <Header />
            <div className="contain">
                <div className="whole-form">
                    <div className="picture">
                        <img src={require('../../Images/background.jpg')} alt="welcome picture" height={150} />
                    </div>
                    <div className="group">
                        <div className="user">
                            <img src={require('../../Images/user.jpg')} alt="user picture" height={100} />
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                onChange={(event) => setEmail(event.target.value)} 
                                className="control-form" 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                onChange={(event) => setPassword(event.target.value)} 
                                className="control-form" 
                            />
                        </div>
                        <div className="button-group">
                            <button className="button" onClick={login}>Sign as {role}</button>
                        </div>
                        <div className="forgot-group">
                            <Link to="/ForgotPassword" className="forgotbutton">Forgot Password? Click Here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
