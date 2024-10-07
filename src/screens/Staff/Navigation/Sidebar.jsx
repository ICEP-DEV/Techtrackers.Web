import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const SideBar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/staffdashboard/WelcomeStaff",
            name:"DASHBOARD",
            icon:<FaTh/>
        },
        {
            path:"/staffdashboard/logissueform",
            name:"LOG ISSUE",
            icon:<FaUserAlt/>
        },
        {
            path:"/staffdashboard/IssueDisplay",
            name:"ALL ISSUE",
            icon:<FaRegChartBar/>
        },
        {
            path:"/staffdashboard/issueTracker",
            name:"NOTIFICATIONS",
            icon:<FaCommentAlt/>
        },
    ]
    return (
        <div className="cup">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="staffTitle">Staff</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="menuIcon">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               <div className="ItemIcon">
               {
                
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" >
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="navItem">{item.name}</div>
                       </NavLink>
                   ))
               }
               </div>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default SideBar;