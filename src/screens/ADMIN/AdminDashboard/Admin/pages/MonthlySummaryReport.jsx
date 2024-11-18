import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const MonthlyGenerateReport = () => {
  const { state } = useLocation();
  const { startDate, endDate } = state || {};
  const navigate = useNavigate(); // useNavigate hook for navigation

  const tableData = [
    {
      month: "January",
      totalIssues: 120,
      issuesClosed: 100,
      issuesOpen: 20,
      avgResolution: "3 days",
    },
    {
      month: "April",
      totalIssues: 105,
      issuesClosed: 95,
      issuesOpen: 10,
      avgResolution: "2.5 days",
    },
    {
      month: "July",
      totalIssues: 110,
      issuesClosed: 100,
      issuesOpen: 10,
      avgResolution: "2.9 days",
    },
    {
      month: "September",
      totalIssues: 135,
      issuesClosed: 120,
      issuesOpen: 15,
      avgResolution: "2.7 days",
    },
    {
      month: "December",
      totalIssues: 130,
      issuesClosed: 115,
      issuesOpen: 15,
      avgResolution: "3.4 days",
    },
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

  // Handle the back button functionality
  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#E5F0EC",
        marginTop: "-10px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Monthly Issue Report</h1>
      <p style={{ textAlign: "center" }}>
        Date Range: {startDate || "Start Date"} to {endDate || "End Date"}
      </p>

      {/* Table Section */}
      <TableContainer
        component={Paper}
        style={{ margin: "20px auto", maxWidth: 800 }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#5C9A3A" }}>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Month
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Total Issues
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Issues Closed
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Issues Open
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Average Resolution Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#E2F0D9" : "white",
                }}
              >
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "30px",
        }}
      >
        <div style={{ width: "35%" }}>
          <h3 style={{ textAlign: "center" }}>
            Number of Issues Logged per Category
          </h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
        <div style={{ width: "20%" }}>
          <h3 style={{ textAlign: "center" }}>
            Distribution of Issues by Department
          </h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <button
          onClick={handleBackClick} // This will now go back to the previous page
          style={{
            backgroundColor: "#B71C1C",
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
            onClick={downloadPDF}
            style={{
              backgroundColor: "#005A50",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            DOWNLOAD PDF
          </button>
          <button
            onClick={exportToExcel}
            style={{
              backgroundColor: "#333",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            EXPORT TO EXCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyGenerateReport;
