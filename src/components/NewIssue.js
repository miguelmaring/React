import React from "react";
import { useNavigate } from 'react-router-dom';


const NewIssue = () => {

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch("http://127.0.0.1:8000/api/issues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "ya29.a0AWY7CkmDZka64IvhAbkXV0oSJOQC9Kq4u5XSTTe90T9w26MJCR1Eme4eqb604u2e3SGQv4CpL6PAnDpZWujVUGqd1TVMr9O5saEmPPad0N6bws6J5fsNQaoUMuC1g60bGvI3bycZ3-OW_tcCX2h_beaJZeTGbgaCgYKAbUSARASFQG1tDrpSvrOPzg-jwGvh2aEKhzi5Q0165"
          },
          body: JSON.stringify({
            subject: e.target.subject.value,
            content: e.target.content.value,
            type: e.target.type.value,
            priority: e.target.priority.value,
            severity: e.target.severity.value,
            deadline: e.target.deadline.value === '' ? null : e.target.deadline.value,
            assigned_to: null
          }),
        });
    
        if (response.ok) {
            window.alert("Tu Issue es ha sido creada correctamente.")
          navigate("/");
        } else {
          if (response.status === 400){
            window.alert("El contenido es demasiado largo. Máximo 280 carácteres.")
          }
        }
      }
      
  return (
    <div className="container px-5 my-5 formnew">
      <form id="contactForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="subject">Subject</label>
          <textarea name="subject" required className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="content">Content</label>
          <textarea name="content" required className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="type">Type</label>
          <select name="type" defaultValue="B" className="form-select">
            <option value="B">Bug</option>
            <option value="Q">Question</option>
            <option value="E">Enhancement</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="severity">Severity</label>
          <select name="severity" defaultValue="W" className="form-select">
            <option value="W">Whishlist</option>
            <option value="M">Minor</option>
            <option value="N">Normal</option>
            <option value="I">Important</option>
            <option value="C">Critical</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="priority">Priority</label>
          <select name="priority" defaultValue="L" className="form-select">
            <option value="L">Low</option>
            <option value="N">Normal</option>
            <option value="H">High</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="deadline">Select a Deadline</label>
          <input type="datetime-local" name="deadline" className="form-control" />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary btn-lg" id="submitButton" type="submit">Submit</button>
        </div>
      </form>

      <style>{`
        .formnew {
          margin-left: 200px;
        }
      `}</style>
    </div>

    
  );
};

export default NewIssue;
