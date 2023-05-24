import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Button} from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Navbar from "./components/Navbar";
import Issues from "./components/Issues";
import Sidebar from "./components/Sidebar";
import NewIssue from "./components/NewIssue"
import IssueDetail from './components/IssueDetail';
import IssuesTable from "./components/IssuesTable";

function App() {

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://el-issue-tracker.herokuapp.com/api/issues`)
            .then((response) => response.json())
            .then((data) => setIssues(data));
        setLoading(false)
    });

    return (
        <Router>
            <Navbar brand="Issues Tracker" />
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ width: "100%", padding: "80px" }}>
                <Routes>
                    <Route path="/" element={<IssuesTable issues={issues} />} />
                    <Route path="/issues/:id" element={<IssueDetail />} />
                    <Route path="/new-issue" element={<NewIssue />} />
                </Routes>
                </div>
            </div>
        </Router>
        
    );
}

export default App;
