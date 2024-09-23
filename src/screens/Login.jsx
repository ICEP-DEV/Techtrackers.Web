import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/login.css";
import Header from './Header';


const Login = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
      <div>
        <Header />
          <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">LOGIN</h1>
                <hr className="login-line" />
                <div className="button-container">
                <div className="login-card" onClick={() => handleNavigation('/staff')}>Staff</div>
                <div className="login-card" onClick={() => handleNavigation('/technician')}>Technician</div>
                <div className="login-card" onClick={() => handleNavigation('/admin')}>Admin</div>
                <div className="login-card" onClick={() => handleNavigation('/hod')}>HOD</div>
                </div>
            </div>
         </div>
     </div>
    
  );
};

export default Login;






















/*
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { Link } from 'react-router-dom';
function Login() {
    const user = [{ email: "kekana@gmail.com", password: '123zxc@Z' }, { email: 'nkosana@gmail.com', password: '123zxc@Z' }]

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const login = () => {
        var isFound = false;
        for (var k = 0; k < user.length; k++) {
            if (user[k].email === Email) {
                if(user[k].password === Password){ 
                    isFound=true;
                }
            }
        }

        if (isFound) {
            toast.success("Login successfully");
        }
        else {
            toast.warn("user not found");
        }


    }
    return (<div>
        <ToastContainer />
        <Header />
        <div className="container">
        <div className="whole-form">
        <div className="picture">
          <img src={require('./background.jpg')} alt="welcome picture" height={150}/>
        </div>
        <div className="group">
            <div className="user">
            <img src={require('./user.jpg')} alt="user picture" height={100}/>
            </div>
        <div className="form-group">
            <input type="email" placeholder="Email"onChange={(event) => setEmail(event.target.value)} className="control-form" />
        </div>
        <div className="form-group">
            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} className="control-form" />
        </div>
        <div className="button-group">
            <button className="button" onClick={login}>Login</button>
            
        </div>
        <div className="forgot-group">
        <Link to="/ForgotPassword" className="forgotbutton">Forgot Password? Click Here</Link>
        </div>
        </div>
        
        </div>
        </div>
    </div>);
}

export default Login;
*/