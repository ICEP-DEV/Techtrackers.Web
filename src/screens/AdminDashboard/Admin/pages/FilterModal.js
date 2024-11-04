import React, { useState } from 'react'

export default function FilterModal({ onClose, onFilter }) {
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onFilter(filters)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Filter Logs</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              value={filters.priority}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="apply-button">Apply</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}