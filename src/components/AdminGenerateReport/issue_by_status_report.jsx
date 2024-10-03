import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const IssueByStatusReport = () => {
  const tableData = [
    { logID: 'LOG-001', description: 'Internal Issue', priority: 'High', technician: 'Lunga Ntshingila', status: 'In Progress', dateCreated: '25-08-2024', dueDate: '25-08-2024', dateClosed: '25-08-2024' },
    { logID: 'LOG-002', description: 'Lights Flickering', priority: 'Low', technician: 'Jane Smith', status: 'Resolved', dateCreated: '20-08-2024', dueDate: '22-08-2024', dateClosed: '21-08-2024' },
    { logID: 'LOG-003', description: 'Printer not working', priority: 'Medium', technician: 'Themba Zwane', status: 'Resolved', dateCreated: '30-08-2024', dueDate: '30-08-2024', dateClosed: '30-08-2024' },
    { logID: 'LOG-004', description: 'Database connection timeout', priority: 'High', technician: 'Abel Makamu', status: 'In Progress', dateCreated: '23-08-2024', dueDate: '24-08-2024', dateClosed: '23-08-2024' },
  ];

  const barChartData = {
    labels: ['OPEN', 'IN PROGRESS', 'COMPLETED'],
    datasets: [
      {
        label: 'Number of Issues',
        data: [30, 20, 50],
        backgroundColor: ['#AECFD6', '#5DADEC', '#005A50'],
      },
    ],
  };

  const pieChartData = {
    labels: ['COMPLETED', 'OPEN', 'IN PROGRESS'],
    datasets: [
      {
        label: 'Issue Status Distribution',
        data: [47, 33, 20],
        backgroundColor: ['#005A50', '#AECFD6', '#5DADEC'],
      },
    ],
  };

  // Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Issue By Status Report', 10, 10);
    doc.text('Date report was generated: 27-AUG-2024', 10, 20);

    // Add table to PDF
    doc.autoTable({
      head: [['Log ID', 'Description', 'Priority', 'Technician', 'Status', 'Date Created', 'Due Date', 'Date Closed']],
      body: tableData.map(row => [row.logID, row.description, row.priority, row.technician, row.status, row.dateCreated, row.dueDate, row.dateClosed]),
    });

    // Save the PDF
    doc.save('issue_report.pdf');
  };

  // Function to export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Issue Report');

    // Download the Excel file
    XLSX.writeFile(workbook, 'issue_report.xlsx');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Issue By Status Report</h1>
      <p style={{ textAlign: 'center' }}>Date report was generated: 27-AUG-2024</p>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#74B251' }}>
              <TableCell><strong>Log ID</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Priority</strong></TableCell>
              <TableCell><strong>Assigned Technician</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Date Created</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Date Closed</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.logID} style={{ backgroundColor: row.logID === 'LOG-002' ? '#E2F0D9' : 'white' }}>
                <TableCell>{row.logID}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell>{row.technician}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.dateCreated}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>{row.dateClosed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Chart Section */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
        <div style={{ width: '45%' }}>
          <h3 style={{ textAlign: 'center' }}>NUMBER OF ISSUES PER STATUS</h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
        <div style={{ width: '45%' }}>
          <h3 style={{ textAlign: 'center' }}>ISSUE STATUS DISTRIBUTION</h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>BACK</button>
        <div>
          <button
            onClick={downloadPDF}
            style={{ backgroundColor: '#005A50', color: 'white', padding: '10px 20px', marginRight: '10px', border: 'none', cursor: 'pointer' }}>
            DOWNLOAD PDF
          </button>
          <button
            onClick={exportToExcel}
            style={{ backgroundColor: '#333', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
            EXPORT TO EXCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueByStatusReport;
