import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { differenceInDays } from 'date-fns';
import { FaClock } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
// import { Link } from "react-router-dom";
import {Button} from 'primereact/button';

function IssueDetail() {
    let { id } = useParams();

    const [issue, setIssue] = useState([]);

    const [count,setCount] = useState(0);

    useEffect(() => {
        fetch(`https://el-issue-tracker.herokuapp.com/api/issues/${id}`)
        .then((response) => response.json())
        .then((data) => setIssue(data));
    }, [id]);

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
        <div key={issue.id} className='issuedetail'>
            <div className='grid'>
                {/* <!-- Issue Title --> */}
                <div className="title-grid">
                    <h3>
                        <span style={{ color: "cornflowerblue" }}>#{issue.id} </span>
                        {issue.subject}
                        {issue.blocked ? <FaLock /> : null}
                        {issue.deadline ? <FaClock style={{ color: calculateTimeLeft(issue.deadline).color }} /> : null}
                    </h3>
                    <h6>ISSUE</h6>
                </div>

                {/* <!-- Issue Buttons --> */}
                <div className="button-grid">
                    <div class="issue-buttons">
                        <a href="#" className="delete-issue-btn">
                            <FaTrash />
                        </a>
                        <a href="#" className="edit-issue-btn">
                            <FaPen />
                        </a>
                    </div>
                </div>
            </div>
        
            <style>{`
                .issuedetail {
                margin-left: 200px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-auto-rows: minmax(8px, auto);
                }
                .grid {
                
                }
                
                .title-grid {
                    padding: 10px;
                    padding-bottom: 0px;
                    height: auto;
                    grid-row: 1;
                    grid-column: span 8;
                }
                
                .buttons-grid {
                    height: auto;
                    grid-row: 1;
                }
                
                .issue-buttons {
                    padding: 20px;
                }
                
                .delete-issue-icon {
                    vertical-align: bottom;
                    margin-right: 4px;
                    margin-left: 4px;
                }
                
                .edit-issue-icon {
                    vertical-align: bottom;
                    margin-right: 12px;
                    margin-left: 4px;
                }
                
                .delete-issue-btn {
                    text-decoration: none;
                    color: black;
                    float: right;
                }
                
                .delete-issue-btn:hover {
                    text-decoration: none;
                    color: red;
                }
                
                .edit-issue-btn {
                    text-decoration: none;
                    color: black;
                    float: right;
                }
                
                .edit-issue-btn:hover {
                    text-decoration: none;
                    color: #008aa8;
                }
                }
            `}</style>
        </div>
    );
}

export default IssueDetail;
