import React from 'react'

export default function SortModal({ onClose, onSort }) {
  const handleSort = (key, direction) => {
    onSort(key, direction)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Sort Logs</h2>
        <div className="sort-options">
          <button onClick={() => handleSort('date', 'desc')}>Date (Newest First)</button>
          <button onClick={() => handleSort('date', 'asc')}>Date (Oldest First)</button>
          <button onClick={() => handleSort('priority', 'desc')}>Priority (High to Low)</button>
          <button onClick={() => handleSort('priority', 'asc')}>Priority (Low to High)</button>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  )
}