import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "./TechnicianPerformanceReport.css"; // Import the CSS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TechnicianPerformanceReport = ({ isSidebarOpen }) => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { startDate, endDate } = location.state || {};

  const tableData = [
    {
      name: "Lunga Ntshingila",
      assigned: 25,
      resolved: 22,
      resolutionTime: "3.5 days",
      pending: 3,
      rating: "4.5/5",
    },
    {
      name: "Abel Makamu",
      assigned: 30,
      resolved: 28,
      resolutionTime: "3.0 days",
      pending: 2,
      rating: "4.7/5",
    },
    {
      name: "Jane Smith",
      assigned: 20,
      resolved: 15,
      resolutionTime: "4.2 days",
      pending: 5,
      rating: "4.0/5",
    },
  ];

  const chartData = {
    labels: ["L Ntshingila", "A Makamu", "J Smith", "T Zwane"],
    datasets: [
      {
        label: "Number of Issues",
        data: [3.5, 4.2, 3.0, 4.0],
        fill: false,
        borderColor: "#333",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Technician Performance Report", 10, 10);
    doc.text(
      `Date report was generated: ${new Date().toLocaleDateString()}`,
      10,
      20
    );
    doc.text(`Report Duration: ${startDate} - ${endDate}`, 10, 30);

    doc.autoTable({
      head: [
        [
          "Technician Name",
          "Total Issues Assigned",
          "Issues Resolved",
          "Average Resolution Time",
          "Pending Issues",
          "Performance Rating",
        ],
      ],
      body: tableData.map((row) => [
        row.name,
        row.assigned,
        row.resolved,
        row.resolutionTime,
        row.pending,
        row.rating,
      ]),
    });

    doc.save("technician_performance_report.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Technician Performance");
    XLSX.writeFile(workbook, "technician_performance_report.xlsx");
  };

  return (
    <div
      className={`technician-report-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <h1 className="report-title">Technician Performance Report</h1>
      <p className="report-subtitle">
        Date report was generated: {startDate} - {endDate}
      </p>

      <div className="report-table-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="report-table-head">
                <TableCell>Technician Name</TableCell>
                <TableCell>Total Issues Assigned</TableCell>
                <TableCell>Issues Resolved</TableCell>
                <TableCell>Average Resolution Time</TableCell>
                <TableCell>Pending Issues</TableCell>
                <TableCell>Performance Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index} className="report-table-row">
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.assigned}</TableCell>
                  <TableCell>{row.resolved}</TableCell>
                  <TableCell>{row.resolutionTime}</TableCell>
                  <TableCell>{row.pending}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="chart-container">
        <h2 className="chart-title"> Number of Issues Logged per Category</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="buttons-container">
      <button onClick={() => navigate(-1)} className="back-button">
          BACK
        </button>
        <div className="action-buttons">
          <button onClick={downloadPDF} className="download-pdf-button">
            DOWNLOAD PDF
          </button>
          <button onClick={exportToExcel} className="export-excel-button">
            EXPORT TO EXCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianPerformanceReport;
