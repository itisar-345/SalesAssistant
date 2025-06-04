import React, { useEffect, useState } from "react";
import "../css/SideNav.css";
import { getCache, setCache } from "../utils/sessionCache";

function SideNav({ isOpen }) {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const data = getCache("voiceCommands");
    setCommands(data || []);
  }, []);

  const handleDelete = (index) => {
    const updated = [...commands];
    updated.splice(index, 1);
    setCommands(updated);
    setCache("voiceCommands", updated);
  };

  return (
    <div className={`side-nav ${isOpen ? "open" : "closed"}`}>
      <h3> Previous Commands</h3>
      <ul>
        {commands.map((cmd, idx) => (
          <li key={idx}>
            {cmd}
            <button className="delete-btn" onClick={() => handleDelete(idx)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;
