import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../SidebarCSS/AddTechnician.css";
import addCircle from "../adminIcons/addCircle.png";

const AddTechnician = () => {
  const navigate = useNavigate();

  // State for form inputs and error messages
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialization: "Computer Repair Technician",
    contact: "",
    password: "",
    fromTime: "",
    toTime: "",
  });
  const [errors, setErrors] = useState({});

  const handleExit = () => {
    navigate(-1);
  };

  const submit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      toast.success("Successfully Added Technician!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
      setTimeout(() => navigate("/adminDashboard/TechnicianAdded"), 2000);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleGeneratePassword = () => {
    setFormData({
      ...formData,
      password: Math.random().toString(36).slice(2, 10),
    });
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";

    // Contact validation for South African 10-digit number
    const contactPattern = /^0\d{9}$/;
    if (!formData.contact) {
      newErrors.contact = "Contact is required";
    } else if (!contactPattern.test(formData.contact)) {
      newErrors.contact =
        "Enter a valid 10-digit South African number (e.g., 0123456789)";
    }

    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.fromTime)
      newErrors.fromTime = "Availability start time is required";
    if (!formData.toTime)
      newErrors.toTime = "Availability end time is required";
    return newErrors;
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: "", // Clear the error message on change
    });
  };

  return (
    <div className="dashboard-container">
      <div className="headerx">
        <img src={addCircle} alt="Add Technician" className="iconx" />
        <h1 className="header-title">Add Technician</h1>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <div className="error-message">{errors.fullName}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="tech@company.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="specialization" className="form-label">
            Specialization
          </label>
          <select
            id="specialization"
            className="specialization-control"
            value={formData.specialization}
            onChange={handleChange}
          >
            <option>Computer Repair Technician</option>
            <option>Network Specialist</option>
            <option>Hardware Technician</option>
          </select>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              placeholder="0123456789"
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && (
              <div className="error-message">{errors.contact}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Create New Password</label>
            <div className="password-section">
              <input
                type="text"
                className="form-control"
                id="password"
                value={formData.password}
                readOnly
              />
              <button
                type="button"
                className="btn-generate btn-success"
                onClick={handleGeneratePassword}
              >
                Generate
              </button>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label htmlFor="fromTime" className="form-label">
              Set Availability
            </label>
            <div className="availability-sectionx">
              <span>From:</span>
              <input
                type="time"
                className="form-control"
                id="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
              />
              {errors.fromTime && (
                <div className="error-message">{errors.fromTime}</div>
              )}
              <span>To:</span>
              <input
                type="time"
                className="form-control"
                id="toTime"
                value={formData.toTime}
                onChange={handleChange}
              />
              {errors.toTime && (
                <div className="error-message">{errors.toTime}</div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button type="button" className="btns btn-danger" onClick={handleExit}>
            CANCEL
          </button>
          <button type="button" className="btns btn-add" onClick={submit}>
            ADD TECHNICIAN
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTechnician;
