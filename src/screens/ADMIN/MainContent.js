import React, { useState } from 'react'
import { Search, Filter, List, ArrowLeft,Clock } from 'lucide-react'
import FilterModal from './FilterModal'
import SortModal from './SortModal'
import DetailView from './DetailView'
import '../ADMIN/Adminstyles/styles.css';

const initialLogs = [
  { id: 'HR-P2-1230', description: 'Internal Issue: Maintenance Request', date: '19/08/2024', priority: 'High', assigned: 'Mike Mdluli', status: 'Pending' },
  { id: 'FI-P1-1231', description: 'Network Issue', date: '15/08/2024', priority: 'High', assigned: 'Abel Makamu', status: 'Ongoing' },
  { id: 'IT-P3-1232', description: 'Printer not working', date: '22/07/2024', priority: 'Low', assigned: 'Buhlaluse Ngcobo', status: 'Resolved' },
  { id: 'IT-P3-1233', description: 'Unable to login to portal', date: '22/07/2024', priority: 'Low', assigned: 'Pinky Ndlovu', status: 'Resolved' },
]

function MainContent() {
  const [logs, setLogs] = useState(initialLogs)
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isSortModalOpen, setIsSortModalOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState(null)

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredLogs = logs.filter((log) =>
    Object.values(log).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleFilter = (filters) => {
    const filteredLogs = initialLogs.filter((log) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '') return true
        return log[key].toLowerCase() === value.toLowerCase()
      })
    })
    setLogs(filteredLogs)
    setIsFilterModalOpen(false)
  }

  const handleSort = (key, direction) => {
    const sortedLogs = [...logs].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
    setLogs(sortedLogs)
    setIsSortModalOpen(false)
  }

  const handleViewLog = (log) => {
    setSelectedLog(log)
  }

  const handleBackToList = () => {
    setSelectedLog(null)
  }

  if (selectedLog) {
    return <DetailView log={selectedLog} onBack={handleBackToList} />
  }

  return (
    <main className="dashboard-container">
    
      <div className="logs-header">
        <h2 className="logs-title"><Clock size={40}/>All Logs</h2>
        <button className="log-issue-button">LOG ISSUE</button>
      </div>
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="filter-sort">
        <button className="filter-button" onClick={() => setIsFilterModalOpen(true)}>
          <Filter />
          Filter
        </button>
        <button className="sort-button" onClick={() => setIsSortModalOpen(true)}>
          <List />
          Sort
        </button>
      </div>
      <table className="logs-table">
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Issue Description</th>
            <th>Date Reported</th>
            <th>Priority Level</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.description}</td>
              <td>{log.date}</td>
              <td>{log.priority}</td>
              <td>{log.assigned}</td>
              <td>
                <span className={`status ${log.status.toLowerCase()}`}>{log.status}</span>
              </td>
              <td>
                <button className="view-button" onClick={() => handleViewLog(log)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <span>...</span>
        <button>7</button>
        <button>8</button>
      </div>
      {isFilterModalOpen && (
        <FilterModal onClose={() => setIsFilterModalOpen(false)} onFilter={handleFilter} />
      )}
      {isSortModalOpen && (
        <SortModal onClose={() => setIsSortModalOpen(false)} onSort={handleSort} />
      )}
  <div className="back-button">
        <button className="icon-button">
          <ArrowLeft />
          <span>BACK</span>
        </button>
      </div>
    </main>
    
  )
}

export default MainContent