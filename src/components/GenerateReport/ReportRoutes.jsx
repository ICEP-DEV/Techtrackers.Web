
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportPage from "./Report";
import IssuesStatusReport from "./IssuesStatusReport";
import MonthlySummaryReport from "./MonthlySummaryReport";
import TechnicianPerformanceReport from "./TechnicianPerformanceReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReportPage />} />
        <Route path="/status-report" element={<IssuesStatusReport />} />
        <Route
          path="/monthly-summary-report"
          element={<MonthlySummaryReport />}
        />
        <Route
          path="/technician-performance-report"
          element={<TechnicianPerformanceReport />}
        />
      </Routes>
    </Router>
  );
}

export default App;
