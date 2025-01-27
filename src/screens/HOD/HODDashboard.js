import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import './HODDashboard.css'; // Import the updated CSS
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const HODDashboard = ({ isSidebarOpen }) => {
  // Data for bar chart (Average Resolution Time)
  const barData = {
    labels: ['Week 1', 'Week 2', 'Week 3'],
    datasets: [
      {
        label: 'Resolution Time (hrs)',
        data: [24, 72, 48], // Update this with actual values if dynamic
        backgroundColor: '#2FB00F',
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white', // Set y-axis numbers color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Lighter gridlines for visibility
        },
      },
      x: {
        ticks: {
          color: 'white', // Set x-axis numbers color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Lighter gridlines for visibility
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Set legend text color to white
        },
      },
      tooltip: {
        bodyColor: 'white', // Set tooltip text color to white
      },
    },
  };

  // Data for pie chart (Issue Summary)
  const pieData = {
    labels: ['Resolved', 'Pending', 'In Progress', 'On Hold'],
    datasets: [
      {
        label: '# of Issues',
        data: [60, 31, 6, 3], // Update this with actual values if dynamic
        backgroundColor: ['#2FB00F', '#D01E1E', '#B08D0F', '#0C4643'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // Set pie chart legend text color to white
        },
      },
      tooltip: {
        bodyColor: 'white', // Set tooltip text color to white
      },
    },
  };

  return (
    <div className={`dashboard-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <h1>Welcome, HOD!</h1>

      <div className="overview">
        <div className="stats-card">
          <h3>All Issues</h3>
          <p>48</p>
        </div>
        <div className="stats-card">
          <h3>Open Issues</h3>
          <p>16</p>
        </div>
        <div className="stats-card">
          <h3>Closed Issues</h3>
          <p>48</p>
        </div>
        <div className="stats-card">
          <h3>Human Resources Department</h3>
        </div>
      </div>

      <div className="charts">
        <div className="bar-chart">
          <h3>Average Resolution Time</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        <div className="pie-chart">
          <h3>Issue Summary</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default HODDashboard;
