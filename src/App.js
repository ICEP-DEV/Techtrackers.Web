import React from 'react';
import './App.css';
import StaffHeader from './components/StaffHeader';
import IssueTracker from './components/IssueTracker'; // Adjust the path as needed


function App() {
    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('user_info');
        console.log('User logged out');
        // Optionally, you might want to refresh the page or update the state here
        window.location.reload(); // Reload to clear user data from the header
    };

    // Function to simulate login
    const handleLogin = (userData) => {
        const userInfo = {
            name: userData.firstName,
            surname: userData.lastName,
            email: userData.email,
            department: userData.department,
        };
        localStorage.setItem('user_info', JSON.stringify(userInfo));
        console.log('User logged in:', userInfo);
        // Optionally, refresh the page or update the state here
        window.location.reload(); // Reload to update header with user data
    };

    return (
        <div className="App">
            <StaffHeader onLogout={handleLogout} />
            <IssueTracker />
            {/* Simulate user login (replace this with your actual login logic) */}
            <button onClick={() => handleLogin({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'Human Resource (HR)' })}>
                Login as John Doe
            </button>
        </div>
    );
}

export default App;