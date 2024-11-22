import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import "./MonthlyGenerateReport.css"; // Import the CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MonthlyGenerateReport = ({ isSidebarOpen }) => {
  const navigate = useNavigate(); // Create the navigate function
  const { state } = useLocation();
  const { startDate, endDate } = state || {};

  const tableData = [
    {
      month: "January 2024",
      totalIssues: 80,
      issuesClosed: 75,
      issuesOpen: 5,
      avgResolution: "3.5 days",
    },
    {
      month: "February 2024",
      totalIssues: 90,
      issuesClosed: 85,
      issuesOpen: 5,
      avgResolution: "3.2 days",
    },
    {
      month: "March 2024",
      totalIssues: 100,
      issuesClosed: 95,
      issuesOpen: 5,
      avgResolution: "3.0 days",
    },
    // Add more rows as needed...
  ];

  const barChartData = {
    labels: ["Software", "Hardware", "Network", "Database"],
    datasets: [
      {
        label: "Number of Issues",
        data: [50, 30, 20, 25],
        backgroundColor: ["#003b36", "#3cb4ac", "#aecfd6", "#015e4d"],
      },
    ],
  };

  const pieChartData = {
    labels: ["IT", "HR", "Finance", "Operations"],
    datasets: [
      {
        label: "Issue Distribution by Department",
        data: [50, 20, 15, 15],
        backgroundColor: ["#005A50", "#20B2AA", "#7FC9C9", "#014f43"],
      },
    ],
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Issue Report", 10, 10);

    doc.autoTable({
      head: [
        [
          "Month",
          "Total Issues",
          "Issues Closed",
          "Issues Open",
          "Average Resolution Time",
        ],
      ],
      body: tableData.map((row) => [
        row.month,
        row.totalIssues,
        row.issuesClosed,
        row.issuesOpen,
        row.avgResolution,
      ]),
    });

    doc.save("issue_report.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Issue Report");

    XLSX.writeFile(workbook, "issue_report.xlsx");
  };

  return (
    <div
      className={`monthly-report-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <h1>Monthly Issue Report</h1>
      <p>
        Date Range: {startDate || "Start Date"} to {endDate || "End Date"}
      </p>

      {/* Table Section */}
      <TableContainer component={Paper} className="report-table-container">
        <Table className="report-table">
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Total Issues</TableCell>
              <TableCell>Issues Closed</TableCell>
              <TableCell>Issues Open</TableCell>
              <TableCell>Average Resolution Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.month}</TableCell>
                <TableCell>{row.totalIssues}</TableCell>
                <TableCell>{row.issuesClosed}</TableCell>
                <TableCell>{row.issuesOpen}</TableCell>
                <TableCell>{row.avgResolution}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Chart Section */}
      <div className="chart-container">
        <div className="chart-bar">
          <h3>Number of Issues Logged per Category</h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
        <div className="chart-pie">
          <h3>Distribution of Issues by Department</h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons-container">
        <button onClick={() => navigate(-1)} className="back-button">
          BACK
        </button>
        <div className="action-buttons">
          <button onClick={downloadPDF} className="download-pdf">
            DOWNLOAD PDF
          </button>
          <button onClick={exportToExcel} className="export-excel">
            EXPORT TO EXCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyGenerateReport;
