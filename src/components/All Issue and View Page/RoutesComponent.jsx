// src/components/RoutesComponent.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Table from "./Table";
import IssueDetails from "./IssueDetails";
import useIssues from "./useIssues";

const RoutesComponent = () => {
  const { issues, setIssues } = useIssues();

  return (
    <Routes>
      <Route path="/" element={<Table issues={issues} setIssues={setIssues} />} />
      <Route path="/issues/:issueId" element={<IssueDetails issues={issues} />} />
    </Routes>
  );
};

export default RoutesComponent;
