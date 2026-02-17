import { useState, useEffect } from "react";
import "./Update.css";

export default function UpdateEmployee() {

  const [searchId, setSearchId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [msg, setMsg] = useState("");

  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empRole, setEmpRole] = useState("");
  const [empSalary, setEmpSalary] = useState("");

  // Load employees once
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(stored);
  }, []);

  // 🔍 Auto search when ID changes
  useEffect(() => {
    if (!searchId.trim()) {
      clearFields();
      setCurrentIndex(-1);
      setMsg("");
      return;
    }

    const index = employees.findIndex(emp => emp.id === searchId.trim());

    if (index === -1) {
      setMsg("Employee not found");
      setCurrentIndex(-1);
      clearFields();
      return;
    }

    const emp = employees[index];
    setEmpName(emp.name);
    setEmpEmail(emp.email);
    setEmpRole(emp.role);
    setEmpSalary(emp.salary);
    setCurrentIndex(index);
    setMsg("Employee loaded");

  }, [searchId, employees]);

  // clear helper
  const clearFields = () => {
    setEmpName("");
    setEmpEmail("");
    setEmpRole("");
    setEmpSalary("");
  };

  // ✏ UPDATE
  const handleUpdate = (e) => {
    e.preventDefault();

    if (currentIndex === -1) {
      setMsg("Enter valid employee ID");
      return;
    }

    const updatedEmployees = [...employees];

    updatedEmployees[currentIndex] = {
      ...updatedEmployees[currentIndex],
      name: empName,
      email: empEmail,
      role: empRole,
      salary: empSalary,
    };

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    setMsg("Employee updated successfully");
  };

  // 🗑 DELETE
  const handleDelete = () => {
    if (currentIndex === -1) {
      setMsg("Enter valid employee ID");
      return;
    }

    if (!window.confirm("Delete this employee?")) return;

    const updatedEmployees = employees.filter((_, i) => i !== currentIndex);

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);

    setSearchId("");
    clearFields();
    setCurrentIndex(-1);
    setMsg("Employee deleted successfully");
  };

  return (
    <div className="update-page">
      <div className="card">
        <h2>Update Employee</h2>

        {/* Search */}
        <div className="search-section">
          <label>Employee ID</label>
          <input
            type="text"
            placeholder="Enter employee id to load data..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        {/* Form */}
        {currentIndex !== -1 && (
          <form className="form-grid" onSubmit={handleUpdate}>

            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={empName}
                onChange={(e)=>setEmpName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={empEmail}
                onChange={(e)=>setEmpEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Role</label>
              <input
                type="text"
                value={empRole}
                onChange={(e)=>setEmpRole(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Salary</label>
              <input
                type="number"
                value={empSalary}
                onChange={(e)=>setEmpSalary(e.target.value)}
                required
              />
            </div>

            <div className="action-row">
              <button type="submit" className="update-btn">
                Update Employee
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </form>
        )}

        {msg && <p className="msg">{msg}</p>}
      </div>
    </div>
  );
}
