import React, { useState } from "react";

const DatePicker = ({ label, value, onChange }) => {
  // Format date as YYYY-MM-DD for the input field
  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Parse date from YYYY-MM-DD format
  const parseDate = (str) => {
    const parts = str.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
  };

  const handleChange = (e) => {
    onChange(parseDate(e.target.value));
  };

  return (
    <div>
      <label>{label}</label>
      <input type="date" value={formatDate(value)} onChange={handleChange} />
    </div>
  );
};

export default DatePicker;
