import React, { useState } from "react";

const RoleSelectorTwo = ({ onChange }) => {
  const [selectedRole, setSelectedRole] = useState("user");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (onChange) onChange(role);
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
      {["user", "admin"].map((role) => (
        <button
          key={role}
          onClick={() => handleRoleChange(role)}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            textTransform: "capitalize",
            background: selectedRole === role ? "#16a34a" : "#e5e7eb",
            color: selectedRole === role ? "#fff" : "#374151",
            border: "none",
          }}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default RoleSelectorTwo;
