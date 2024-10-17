import React, { useEffect, useState } from 'react';
//import './styles/addTechnicianStyles.css';
import './styles/editTechnician.css';
import manageTechnicians from './images/manageTechnicians.png';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ConfirmationModal from '../ADMIN/ConfirmationModal.jsx'; // Import the modal

const AddTechnician = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [technician, setTechnician] = useState({
        fullName: '',
        email: '',
        specialization: 'Computer Repair Technician',
        contact: '',
        fromTime: '',
        toTime: '',
    });

    const [showModal, setShowModal] = useState(false); // Modal visibility state

    useEffect(() => {
        if (id) {
            const fetchTechnician = async () => {
                const technicianData = await fetchTechnicianById(id);
                setTechnician(technicianData);
            };
            fetchTechnician();
        }
    }, [id]);

    const fetchTechnicianById = async (id) => {
        // Simulated API call
        const technicians = [
            { id: '1', fullName: 'Lunga Ntshingila', email: 'tech23@flow.org', specialization: 'Computer Repair Technician', contact: '0112223312', fromTime: '08:00', toTime: '17:00' },
            { id: '2', fullName: 'Jane Smith', email: 'tech24@flow.org', specialization: 'Desktop Support Technician', contact: '0221113343', fromTime: '09:00', toTime: '18:00' },
        ];
        return technicians.find(tech => tech.id === id) || {};
    };

    // const handleExit = () => {
    //     navigate(-1);
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTechnician((prev) => ({ ...prev, [name]: value }));
    };

    const submit = () => {
        toast.success('Technician Details Successfully Updated!', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'light',
        });
        // navigate('/ManageTechnicians');
    };

    const handleRemove = () => {
        // Logic for removing the technician
        toast.success('Technician Successfully Removed!', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'light',
        });
        setShowModal(false); // Close the modal after confirming
        navigate('/ManageTechnicians'); // Navigate back to the technicians list
    };

    return (
        <div className="container">
            <div className="header">
                <img src={manageTechnicians} alt="Manage Technicians" className="icon" />
                <h1 className="header-title">Manage Technicians</h1>
            </div>

            <form>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" name="fullName" className="form-control" id="fullName" placeholder="Enter full name" value={technician.fullName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" id="email" placeholder="tech@company.com" value={technician.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="specialization" className="form-label">Specialization</label>
                    <select id="specialization" className="form-control" name="specialization" value={technician.specialization} onChange={handleChange}>
                        <option value="Computer Repair Technician">Computer Repair Technician</option>
                        <option value="Network Specialist">Network Specialist</option>
                        <option value="Hardware Technician">Hardware Technician</option>
                    </select>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Contact</label>
                        <input type="text" name="contact" className="form-control" id="contact" placeholder="+27 85 999 7754" value={technician.contact} onChange={handleChange} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label htmlFor="availability" className="form-label">Set Availability</label>
                        <input id="chkToggle1" type="checkbox" data-toggle="toggle" checked />
                        <div className="availability-section">
                            <span>From:</span>
                            <input type="time" className="form-control" id="fromTime" name="fromTime" value={technician.fromTime} onChange={handleChange} />
                            <span>To:</span>
                            <input type="time" className="form-control" id="toTime" name="toTime" value={technician.toTime} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="button" className='btn btn-danger' onClick={() => setShowModal(true)}>Remove</button>
                    <button type="button" className='btn btn-success' onClick={submit}>SAVE</button>
                </div>
            </form>

            <ToastContainer />
            <ConfirmationModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleRemove}
            />
        </div>
    );
};

export default AddTechnician;
