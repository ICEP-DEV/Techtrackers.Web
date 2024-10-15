import { useState } from "react";

const useIssues = () => {
  const [issues, setIssues] = useState([
    {
      issueId: "IT-P1-1220",
      name: "John Doe",
      title: "Computer Screen Not Displaying",
      date: "19/08/2024",
      department: "IT",
      priority: "High",
      dueDate: "19/08/2024",
      status: "Pending",
    },
    {
      issueId: "HR-P1-1221",
      name: "Themba Zwane",
      title: "Unable to login",
      date: "19/08/2024",
      department: "HR",
      priority: "High",
      dueDate: "19/08/2024",
      status: "Ongoing",
    },
    {
      issueId: "IT-P1-1222",
      name: "Andile Zondo",
      title: "Connectivity Issue",
      date: "15/08/2024",
      department: "IT",
      priority: "High",
      dueDate: "15/08/2024",
      status: "Ongoing",
    },
    {
      issueId: "FI-P2-1223",
      name: "Sara Smith",
      title: "Low Disk Space",
      date: "11/08/2024",
      department: "Finance",
      priority: "Medium",
      dueDate: "11/08/2024",
      status: "On Hold",
    },
    {
      issueId: "HR-P3-1224",
      name: "John Doe",
      title: "Broken Air Conditioner",
      date: "02/08/2024",
      department: "HR",
      priority: "Low",
      dueDate: "02/08/2024",
      status: "Done",
    },
    {
      issueId: "IT-P2-1225",
      name: "Mike Jones",
      title: "Setup Request",
      date: "28/07/2024",
      department: "IT",
      priority: "Medium",
      dueDate: "28/07/2024",
      status: "Done",
    },
    {
      issueId: "F1-P1-1226",
      name: "John Doe",
      title: "Network Issue",
      date: "19/07/2024",
      department: "Finance",
      priority: "High",
      dueDate: "19/07/2024",
      status: "Done",
    },
    {
      issueId: "PR-P3-1227",
      name: "Mbali Kunene",
      title: "Broken Printer",
      date: "05/07/2024",
      department: "Public Relations",
      priority: "Low",
      dueDate: "05/07/2024",
      status: "Done",
    },
  ]);

  return { issues, setIssues };
};

export default useIssues;
