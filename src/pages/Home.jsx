import "./Home.css";
import { useState } from "react";

// Import section components
import AddEmployee from "./Add";
import ViewEmployee from "./View";
import UpdateEmployee from "./Update";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // SEARCH FUNCTION
  const handleSearch = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const found = employees.find((emp) => emp.id === searchId);

    setSearchResult(found ? found : "notfound");
    setActiveSection("search");
  };

  return (
    <div className="dashboard">

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">

        {/* LEFT BRAND */}
        <div className="brand">
          <span className="logo-text">OwLix</span>
        </div>

        {/* CENTER MENU */}
        <div className="nav-center">
          <button onClick={() => setActiveSection("add")}>Add</button>
          <button onClick={() => setActiveSection("view")}>View</button>
          <button onClick={() => setActiveSection("update")}>Update</button>

          {/* 🔎 SEARCH BOX (ICON INSIDE INPUT) */}
          <div className="search-box">

            <span
              className="search-icon"
              onClick={handleSearch}
            >
              🔍
            </span>

            <input
              type="text"
              placeholder="Search employee ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

          </div>
        </div>

      </nav>

      {/* ===== PAGE CONTENT ===== */}
      <div className="content">

        {/* HOME WELCOME */}
        {activeSection === "home" && (
          <>
            <h2>Employee Management Dashboard</h2>
            <p className="subtitle">
              Add, view, update and search employees easily
            </p>
          </>
        )}

        {/* ADD SECTION */}
        {activeSection === "add" && <AddEmployee />}

        {/* VIEW SECTION */}
        {activeSection === "view" && <ViewEmployee />}

        {/* UPDATE SECTION */}
        {activeSection === "update" && <UpdateEmployee />}

        {/* SEARCH RESULT */}
        {activeSection === "search" && searchResult && (
          <div className="search-result">
            {searchResult === "notfound" ? (
              <p className="notfound">Employee not found ❌</p>
            ) : (
              <>
                <h3>Employee Details</h3>
                <p><b>ID:</b> {searchResult.id}</p>
                <p><b>Name:</b> {searchResult.name}</p>
                <p><b>Email:</b> {searchResult.email}</p>
                <p><b>Role:</b> {searchResult.role}</p>
                <p><b>Salary:</b> {searchResult.salary}</p>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
