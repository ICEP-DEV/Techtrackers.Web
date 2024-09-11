// src/App.js
import React from 'react';
import StaffHeader from './components/StaffHeader';
import IssueTracker from '../components/IssueTracker';


function HeaderApp() {
    return (<div>
        <StaffHeader />
         <IssueTracker />
        <div className="HeaderApp">
            <main>
                <h1>Welcome to the Staff Dashboard</h1>
                {/* Other dashboard content goes here */}
            </main>
        </div>
    </div>

    );
}

export default HeaderApp;