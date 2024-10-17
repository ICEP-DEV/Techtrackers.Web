import React from 'react';
import '../ADMIN/styles/manageTechnicians.css';
import { useNavigate } from 'react-router-dom';

import manageTechnicians from './images/manageTechnicians.png';

import userCircle from './images/userCircle.png';
import userCircle1 from './images/userCircle1.png';
import userCircle2 from './images/userCircle2.png';


const ManageTechnicians = () => {
    const navigate = useNavigate();

    const handleAddTechnician = () => {
        navigate('/AddTechnicianPage');
    };

    const handleManageTechnician = () => {
        navigate('/EditTechnician');
    }

    return (
        <div className="manage-technicians-container">

            {/* Header with Icon and Heading */}
            <div className="header-container">
                <img src={manageTechnicians} alt="Manage Technicians Icon" className="icon" />
                <h1 className="heading">Manage Technicians</h1>
            </div>

            {/* Add Technician Button */}
            <div className="add-technician-container">
                <button className="add-technician" onClick={handleAddTechnician}>Add Technician</button>
            </div>

            {/* Table of Technicians */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Technician</th>
                        <th>Specialization</th>
                        <th>Contact</th>
                        <th>Active Issues</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Row for Lunga Ntshingila */}
                    <tr>
                        <td>
                            <div className="technician-info">
                                <img src={userCircle} alt="Add Technician" className="icon" />
                                <div>
                                    <span className="technician-name">Lunga Ntshingila</span><br />
                                    <span className="technician-email">tech23@flow.org</span>
                                </div>
                            </div>
                        </td>
                        <td className="specialization">Computer Repair Technician</td>
                        <td className="contact">0112223312</td>
                        <td className="active-issues">3</td>
                        <td><button className="manage-button" onClick={handleManageTechnician}>Manage</button></td>
                    </tr>

                    {/* Row for Jane Smith */}
                    <tr>
                        <td>
                            <div className="technician-info">
                                <img src={userCircle1} alt="Add Technician" className="icon" />
                                <div>
                                    <span className="technician-name">Jane Smith</span><br />
                                    <span className="technician-email">tech23@flow.org</span>
                                </div>
                            </div>
                        </td>
                        <td className="specialization">Desktop Support Technician</td>
                        <td className="contact">0221113343</td>
                        <td className="active-issues">1</td>
                        <td><button className="manage-button" onClick={handleManageTechnician}>Manage</button></td>
                    </tr>

                    {/* Row for Themba Zwane */}
                    <tr>
                        <td>
                            <div className="technician-info">
                                <img src={userCircle} alt="Add Technician" className="icon" />
                                <div>
                                    <span className="technician-name">Themba Zwane</span><br />
                                    <span className="technician-email">tech23@flow.org</span>
                                </div>
                            </div>
                        </td>
                        <td className="specialization">Network Technician</td>
                        <td className="contact">0789958858</td>
                        <td className="active-issues">2</td>
                        <td><button className="manage-button" onClick={handleManageTechnician}>Manage</button></td>
                    </tr>

                    {/* Row for Peter Nkosi */}
                    <tr>
                        <td>
                            <div className="technician-info">
                                <img src={userCircle2} alt="Add Technician" className="icon" />
                                <div>
                                    <span className="technician-name">Peter Nkosi</span><br />
                                    <span className="technician-email">tech23@flow.org</span>
                                </div>
                            </div>
                        </td>
                        <td className="specialization">Application Support Technician</td>
                        <td className="contact">0895547754</td>
                        <td className="active-issues">2</td>
                        <td><button className="manage-button" onClick={handleManageTechnician}>Manage</button></td>
                    </tr>

                    <tr>
                        <td>
                            <div className="technician-info">
                                <img src={userCircle1} alt="Add Technician" className="icon" />
                                <div>
                                    <span className="technician-name">Jane Smith</span><br />
                                    <span className="technician-email">tech23@flow.org</span>
                                </div>
                            </div>
                        </td>
                        <td className="specialization">Desktop Support Technician</td>
                        <td className="contact">0221113343</td>
                        <td className="active-issues">1</td>
                        <td><button className="manage-button">Manage</button></td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default ManageTechnicians;
