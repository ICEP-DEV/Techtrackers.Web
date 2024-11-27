import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import styles from './StaffStyle/MainContent.module.css';

export default function MainContent({ onSelectIssue, onOpenChat }) {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("Date Descending");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        const userId = userInfo ? userInfo.userId : null;

        const response = await fetch(`https://localhost:44328/api/Log/GetLogsForStaff?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched logs:', data); // Log the fetched data for debugging

          // Sort the issues by date in descending order (latest first)
          const sortedData = data.sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt));

          setIssues(sortedData);
        } else {
          console.error('Failed to fetch issues');
        }
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  // Handlers for search, filter, and sort changes
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleFilterChange = (e) => setFilterStatus(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  // Apply search, filter, and sort to the list of issues
  const filteredAndSortedIssues = issues
    .filter(issue =>
      issue.priority.toLowerCase().includes(searchTerm)
    )
    .filter(issue => filterStatus === "All" || (issue.status && issue.status.toLowerCase() === filterStatus.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "Date Descending") {
        return new Date(b.issuedAt) - new Date(a.issuedAt);
      } else if (sortOption === "Date Ascending") {
        return new Date(a.issuedAt) - new Date(b.issuedAt);
      } else if (sortOption === "Priority High to Low") {
        return b.priority.localeCompare(a.priority);
      } else if (sortOption === "Priority Low to High") {
        return a.priority.localeCompare(b.priority);
      }
      return 0;
    });

  return (
    <main className={styles.MmainContent}>
      <div className={styles.statusHeader}>
        <Clock size={32} />
        <h2>ALL ISSUES</h2>
      </div>

      {/* Search, Filter, and Sort Controls */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by Priority Level..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <select onChange={handleFilterChange} className={styles.filterSelect}>
          <option value="All">All Status</option>
          <option value="ONGOING">ONGOING</option>
          <option value="PENDING">PENDING</option>
          <option value="RESOLVED">RESOLVED</option>
          <option value="ESCALATED">ESCALATED</option>

        </select>
        <select onChange={handleSortChange} className={styles.sortSelect}>
          <option value="Date Descending">Date Descending</option>
          <option value="Date Ascending">Date Ascending</option>
          <option value="Priority High to Low">Priority High to Low</option>
          <option value="Priority Low to High">Priority Low to High</option>
        </select>
      </div>

      <table className={styles.issuesTable}>
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Issue Title</th>
            <th>Date reported</th>
            <th>Department</th>
            <th>Priority level</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedIssues.map((issue) => (
            <tr key={issue.issueId}>
              <td>{issue.issueId}</td>
              <td>{issue.issueTitle}</td>
              <td>
                {new Date(issue.issuedAt).toLocaleDateString()} {new Date(issue.issuedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td>{issue.department}</td>
              <td>{issue.priority}</td>
              <td>
                <span className={`${styles.status} ${styles[issue.status ? issue.status.toLowerCase() : 'unknown']}`}>
                  {issue.status || 'Unknown'}
                </span>
              </td>
              <td><button className={styles.viewButton} onClick={() => onSelectIssue(issue)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
