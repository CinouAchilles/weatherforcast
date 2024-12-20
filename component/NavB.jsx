import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";

export default function NavB({ currentcity, fun }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility
  const [ct, setCt] = useState(currentcity); // City input state

  // Synchronize state with prop if currentcity changes
  useEffect(() => {
    setCt(currentcity);
  }, [currentcity]);

  // Handle submit button click
  const handleSubmit = () => {
    fun(ct); // Pass the updated city to parent function
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Close sidebar when clicking outside
  const closeSidebar = (e) => {
    if (
      e.target.closest(".sidebar") === null &&
      e.target.closest(".burgeron") === null
    ) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="relative w-full" onClick={closeSidebar}>
      {/* Navbar */}
      <div className="top flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Weather Forecast</h1>
        <MenuIcon
          fontSize="large"
          className="cursor-pointer burgeron btnnav"
          onClick={toggleSidebar}
          style={{ zIndex: 1001 }}
        />
        <div className="flex items-center gap-2 textfieldnav">
          <TextField
            label="Choose Location"
            value={ct}
            onChange={(e) => setCt(e.target.value)}
            size="small"
            className="textfieldnav"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "on" : ""} `}>
 
        <p className="text-lg font-semibold text-gray-300 p-4">Choose Location</p>
        <input
          type="text"
          value={ct}
          onChange={(e) => setCt(e.target.value)}
          placeholder="Enter location..."
          className="w-4/5 p-3 mx-4 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow"
        />
        <button
          onClick={handleSubmit}
          className="w-4/5 p-2 mx-4 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
}
