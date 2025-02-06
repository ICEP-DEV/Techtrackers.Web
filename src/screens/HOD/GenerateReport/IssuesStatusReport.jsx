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
import styles from "./IssueReport.module.css"; // Importing the module-based CSS

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const IssueReport = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { startDate, endDate } = state || {};

  const tableData = [
    {
      logID: "LOG-001",
      description: "Internal Issue",
      priority: "High",
      technician: "Lunga Ntshingila",
      status: "In Progress",
      dateCreated: "25-08-2024",
      dueDate: "25-08-2024",
      dateClosed: "25-08-2024",
    },
    // Additional table data rows here
  ];

  const barChartData = {
    labels: ["OPEN", "IN PROGRESS", "COMPLETED"],
    datasets: [
      {
        label: "Number of Issues",
        data: [30, 20, 50],
        backgroundColor: ["#AECFD6", "#5DADEC", "#005A50"],
      },
    ],
  };

  const pieChartData = {
    labels: ["COMPLETED", "OPEN", "IN PROGRESS"],
    datasets: [
      {
        label: "Issue Status Distribution",
        data: [30, 40, 30],
        backgroundColor: ["#8FD3DF", "#56A9CB", "#023030"],
      },
    ],
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Issue Report", 20, 10);
    doc.autoTable({
      startY: 20,
      head: [
        [
          "Log ID",
          "Description",
          "Priority",
          "Technician",
          "Status",
          "Date Created",
          "Due Date",
          "Date Closed",
        ],
      ],
      body: tableData.map((row) => Object.values(row)),
    });
    doc.save("issue_report.pdf");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Issue Report");
    XLSX.writeFile(wb, "issue_report.xlsx");
  };

  return (
    <div className={`${styles.issueReportContainer} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      <h1>Issue By Status Report</h1>
      <p>Date report was generated: {startDate || "N/A"} to {endDate || "N/A"}</p>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Log ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Technician</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Date Closed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} style={{ backgroundColor: row.logID === "LOG-002" ? "#E2F0D9" : "white" }}>
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

      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <Bar data={barChartData} />
        </div>
        <div className={styles.chart}>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          BACK
        </button>
        <div className={styles.buttons}>
          <button className={styles.exportButton} onClick={exportPDF}>Export Excel</button>
          <button className={styles.downloadButton} onClick={exportExcel}>Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default IssueReport;
