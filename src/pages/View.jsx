import { useState, useEffect } from "react";
import "./View.css";

export default function ViewEmployee() {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(stored);
  }, []);

  return (
    <div className="view-page">
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p className="no-employees">No employees found</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Salary</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className={selectedId === emp.id ? "active-row" : ""}
                onClick={() => setSelectedId(emp.id)}
              >
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>₹ {emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
