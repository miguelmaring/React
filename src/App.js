import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Issues from "./components/Issues";
import Sidebar from "./components/Sidebar";
import NewIssue from "./components/NewIssue"
import IssueDetail from './components/IssueDetail';

function App() {

  return (
    <Router>
      <Navbar brand="Issues Tracker" />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%", padding: "80px" }}>
          <Routes>
            <Route path="/" element={<Issues />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            <Route path="/new-issue" element={<NewIssue />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
