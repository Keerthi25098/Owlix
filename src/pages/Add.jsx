import { useState } from "react";
import "./Add.css";

export default function AddEmployee() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    salary: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (employees.find(emp => emp.id === form.id)) {
      alert("Employee already exists");
      return;
    }

    employees.push(form);
    localStorage.setItem("employees", JSON.stringify(employees));

    alert("Employee added successfully");

    setForm({
      id: "",
      name: "",
      email: "",
      role: "",
      salary: ""
    });
  };

  return (
    <div className="add-page">
      <div className="form-card">
        <h2>Add Employee</h2>
        <form className="emp-form" onSubmit={handleSubmit}>
          <input name="id" placeholder="Employee ID" value={form.id} onChange={handleChange} required />
          <input name="name" placeholder="Employee Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
          <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} required />
          <button type="submit" className="btn">Save Employee</button>
        </form>
      </div>
    </div>
  );
}
