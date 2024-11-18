import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const IssueReport = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
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
    {
      logID: "LOG-002",
      description: "External Issue",
      priority: "Low",
      technician: "Hamilton Masipa",
      status: "Resolved",
      dateCreated: "15-08-2024",
      dueDate: "20-08-2024",
      dateClosed: "20-08-2024",
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
    <div style={{ padding: "20px", marginTop: "-10px" }}>
      <h1 style={{ textAlign: "center" }}>Issue By Status Report</h1>
      <p style={{ textAlign: "center" }}>
        Date report was generated: {startDate || "N/A"} to {endDate || "N/A"}
      </p>

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
              <TableRow
                key={index}
                style={{
                  backgroundColor:
                    row.logID === "LOG-002" ? "#E2F0D9" : "white",
                }}
              >
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "40px",
        }}
      >
        <div style={{ width: "45%" }}>
          <Bar data={barChartData} />
        </div>
        <div>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          BACK
        </button>

        <div>
          <button
            onClick={exportPDF}
            style={{
              backgroundColor: "#005A50",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Export PDF
          </button>
          <button
            onClick={exportExcel}
            style={{
              backgroundColor: "#333",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Export Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueReport;
