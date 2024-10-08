import React from 'react';
// import './App.css';
import './TechRatings.css';
// import StaffHeader from './components/StaffHeader';
// import TechnicianDashboard from './components/TechDashboard';
// import IssueTracker from './components/IssueTracker'; // Adjust the path as needed
// import Ratings from './components/Ratings';


function App() {
    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('user_info'); 
    };

    // Function to simulate login (you can replace this with actual logic)
    const handleLogin = (userData) => {
        const userInfo = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            department: userData.department,
        };
        localStorage.setItem('user_info', JSON.stringify(userInfo));
        console.log('User logged in:', userInfo);
    };

    return (
        <div className="App">
            <StaffHeader onLogout={handleLogout} />
            {/* <TechnicianDashboard/>  */}
            {/* <IssueTracker /> */}
            {/* Simulate user login (replace this with your actual login logic) */}
            <button onClick={() => handleLogin({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' , department: 'Human Resource(HR)'})}>
                Login as John Doe
            </button>
        </div>
    );
}

export default App;
