import React, { useEffect, useState } from "react";
import styles from "../SidebarCSS/ManageDepartments.module.css";

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDepartmentHead, setEditDepartmentHead] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // State for delete confirmation
  const [deleteIndex, setDeleteIndex] = useState(null); // Store index of department to delete

  useEffect(() => {
    const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];
    setDepartments(storedDepartments);
  }, []);

  const handleDelete = (index) => {
    setDeleteIndex(index); // Store the index of the department to delete
    setIsConfirmDeleteOpen(true); // Open the confirmation popup
  };

  const confirmDelete = () => {
    const updatedDepartments = departments.filter((_, i) => i !== deleteIndex);
    localStorage.setItem("departments", JSON.stringify(updatedDepartments));
    setDepartments(updatedDepartments);
    setIsConfirmDeleteOpen(false); // Close the confirmation popup
    setDeleteIndex(null); // Reset the delete index
  };

  const cancelDelete = () => {
    setIsConfirmDeleteOpen(false); // Close the confirmation popup without deleting
    setDeleteIndex(null); // Reset the delete index
  };

  const handleOpenPopup = (index) => {
    setEditIndex(index);
    setEditName(departments[index].name);
    setEditDescription(departments[index].description);
    setEditDepartmentHead(departments[index].departmentHead || ""); // Default value if not present
    setEditLocation(departments[index].location || ""); // Default value if not present
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditIndex(null);
    setEditName("");
    setEditDescription("");
    setEditDepartmentHead("");
    setEditLocation("");
  };

  const handleUpdate = () => {
    const updatedDepartments = [...departments];
    updatedDepartments[editIndex] = {
      name: editName,
      description: editDescription,
      departmentHead: editDepartmentHead,
      location: editLocation,
    };
    localStorage.setItem("departments", JSON.stringify(updatedDepartments));
    setDepartments(updatedDepartments);
    handleClosePopup();
    alert("Department updated successfully!");
  };

  return (
    <div className={styles.container}>
      <h1>Manage Departments</h1>
      {departments.length === 0 ? (
        <p>No departments created yet.</p>
      ) : (
        <div className={styles.departmentList}>
          {departments.map((department, index) => (
            <div key={index} className={styles.departmentBox}>
              <div className={styles.departmentName}>{department.name}</div>

              {/* Dropdown */}
              <div className={styles.dropdown}>
                <button className={styles.dropdownButton}>⋮</button>
                <ul className={styles.dropdownMenu}>
                  <li onClick={() => handleOpenPopup(index)}>Edit</li>
                  <li onClick={() => handleDelete(index)}>Delete</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup for editing */}
      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Update Department</h2>
            <label>
              Name:
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Description:
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className={styles.textarea}
              />
            </label>
            <label>
              Department Head:
              <input
                type="text"
                value={editDepartmentHead}
                onChange={(e) => setEditDepartmentHead(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                className={styles.input}
              />
            </label>
            <div className={styles.popupButtons}>
              <button onClick={handleUpdate} className={styles.saveButton}>
                Save
              </button>
              <button onClick={handleClosePopup} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation popup */}
      {isConfirmDeleteOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Are you sure you want to delete this department?</h2>
            <div className={styles.popupButtons}>
              <button onClick={confirmDelete} className={styles.saveButton}>
                Yes
              </button>
              <button onClick={cancelDelete} className={styles.cancelButton}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDepartments;
