import React from "react";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Issues</Link>
        </li>
        <li>
          <Link to="/new-issue">New Issue</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
      </ul>

      {/* Estilos del sidebar */}
      <style>{`
        .sidebar {
          width: 200px;
          background-color: #f1f1f1;
          height: 100vh;
          padding: 20px;
          padding-top: 80px;
          position: fixed; 
        }

        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        li {
          margin-bottom: 10px;
        }

        a {
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }

        a:hover {
          color: #ff0000;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
