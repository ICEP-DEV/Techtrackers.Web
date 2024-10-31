// src/MainApp.jsx
import React, { useState } from "react";
import "./CollabMain.css";
import Table from "./Table";

const CollabMain = () => {
  const [sortConfig] = useState({ key: null, direction: null });

  return (
    <div className="App">
      <Table sortConfig={sortConfig} />
    </div>
  );
};

export default CollabMain;
