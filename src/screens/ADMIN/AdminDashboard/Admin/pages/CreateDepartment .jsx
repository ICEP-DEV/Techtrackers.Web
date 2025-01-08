import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../SidebarCSS/CreateDepartment.module.css';

const CreateDepartment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departmentHead, setDepartmentHead] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing departments from local storage or initialize to an empty array
    const existingDepartments = JSON.parse(localStorage.getItem("departments")) || [];

    // Add the new department
    const newDepartment = { name, description, departmentHead, location };
    const updatedDepartments = [...existingDepartments, newDepartment];

    // Save updated departments to local storage
    localStorage.setItem("departments", JSON.stringify(updatedDepartments));

    // Clear input fields
    setName("");
    setDescription("");
    setDepartmentHead("");
    setLocation("");

    // Show success message and navigate to "Manage Departments" page
    alert("Department created successfully!");
    navigate("/admindashboard/ManageDepartments");
  };

  return (
    <div className={styles.container}>
      <h1>Create Department</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Department Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="departmentHead">Department Head:</label>
          <input
            type="text"
            id="departmentHead"
            value={departmentHead}
            onChange={(e) => setDepartmentHead(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDepartment;
