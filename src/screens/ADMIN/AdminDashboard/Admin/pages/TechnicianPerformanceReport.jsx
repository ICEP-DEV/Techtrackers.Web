import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
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
  Typography,
  Box,
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

const TechnicianPerformanceReport = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate programmatically
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
    <Box
      sx={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#E5F0EC",
        marginTop: "-10px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Technician Performance Report
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Date report was generated: {startDate} - {endDate}
      </Typography>

      <TableContainer component={Paper} sx={{ margin: "40px 0" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6da397" }}>
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
              <TableRow
                key={index}
                sx={{ backgroundColor: index % 2 === 0 ? "#f0f5f4" : "white" }}
              >
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

      <Box
        sx={{
          padding: "10px",
          backgroundColor: "#dbe7e4",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Number of Issues Logged per Category
        </Typography>
        <Line data={chartData} options={chartOptions} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{ padding: "10px 20px" }}
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          BACK
        </Button>
        <Box>
          <Button
            onClick={downloadPDF}
            variant="contained"
            sx={{
              backgroundColor: "#005A50",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
            }}
          >
            DOWNLOAD PDF
          </Button>
          <Button
            onClick={exportToExcel}
            variant="contained"
            sx={{
              backgroundColor: "#333",
              color: "white",
              padding: "10px 20px",
            }}
          >
            EXPORT TO EXCEL
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TechnicianPerformanceReport;
