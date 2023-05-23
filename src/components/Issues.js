// import React from "react";
import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { differenceInDays } from 'date-fns';
import { FaClock } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";



const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [sort, setSort] = useState("-id");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/issues?ordering=${sort}`)
      .then((response) => response.json())
      .then((data) => setIssues(data));
  }, [sort]);

  const calculateTimeLeft = (deadline) => {
    const now = new Date();
    const deltaDays = differenceInDays(new Date(deadline), now);
  
    if (deltaDays > 30) {
      return { text: "month", color: "green" };
    } else if (deltaDays > 14) {
      return { text: "weeks", color: "blue" };
    } else if (deltaDays > 7) {
      return { text: "week", color: "yellow" };
    } else if (deltaDays > 2) {
      return { text: "days", color: "orange" };
    } else {
      return { text: "now", color: "red" };
    }
  };

  return (
    <div className="issues">
      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Issue Tracker</h1>
        <p className="lead">
          This is the page for Issue Tracker from work of ASW.
        </p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <span>Id</span>
              <button className="ordenar" onClick={() => setSort("-id")} title="asc"> ↑ </button>
              <button className="ordenar" onClick={() => setSort("id")} title="desc"> ↓ </button>
            </th>
            <th scope="col">
                <span>Subject</span>
                <button className="ordenar" onClick={() => setSort("-subject")} title="asc"> ↑ </button>
                <button className="ordenar" onClick={() => setSort("subject")} title="desc"> ↓ </button>
            </th>
            <th scope="col"></th>
            <th scope="col">
                <span>Content</span>
                <button className="ordenar" onClick={() => setSort("-content")} title="asc"> ↑ </button>
                <button className="ordenar" onClick={() => setSort("content")} title="desc"> ↓ </button>
            </th>
            <th scope="col">
                <span>Type</span>
                <button className="ordenar" onClick={() => setSort("-type")} title="asc"> ↑ </button>
                <button className="ordenar" onClick={() => setSort("type")} title="desc"> ↓ </button>
            </th>
            <th scope="col">
                <span>Priority</span>
                <button className="ordenar" onClick={() => setSort("-priority")} title="asc"> ↑ </button>
                <button className="ordenar" onClick={() => setSort("priority")} title="desc"> ↓ </button>
            </th>
            <th scope="col">
                <span>Assigned</span>
                <button className="ordenar" onClick={() => setSort("-assigned_to")} title="asc"> ↑ </button>
                <button className="ordenar" onClick={() => setSort("assigned_to")} title="desc"> ↓ </button>
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td><Link to={`/issues/${issue.id}`}>{issue.id}</Link></td>
              <td><Link to={`/issues/${issue.id}`}>{issue.subject}</Link></td>
              <td>
                {issue.blocked ? <FaLock /> : null}
                {issue.deadline ? <FaClock style={{ color: calculateTimeLeft(issue.deadline).color }} /> : null}
              </td>
              <td><Link to={`/issues/${issue.id}`}>{issue.content.length > 20 ? issue.content.substring(0, 20) + '...' : issue.content}</Link></td>
              <td>{issue.type}</td>
              <td>{issue.priority}</td>
              <td>{issue.assigned_to}</td>
              <td> <FaPen /></td>
              <td> <FaTrash /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .issues {
          margin-left: 200px;
        }
        .ordenar{
            display: inline;
            border: none; 
            background: none; 
            cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Issues;

