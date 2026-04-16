import React, { useState } from "react";

export default function ControlPanel({ onSubmit, isAnimating }) {
  const [p, setP] = useState(16);
  const [q, setQ] = useState(5);

  const handleSubmit = () => {
    const sqrt = Math.sqrt(p);

    if (!Number.isInteger(sqrt)) {
      alert("p must be perfect square (4, 9, 16, 25, 36, 49, 64)");
      return;
    }

    if (p < 4 || p > 64) {
      alert("p must be between 4 and 64");
      return;
    }

    if (q <= 0 || q >= p) {
      alert("q must be between 1 and " + (p - 1));
      return;
    }

    onSubmit(p, q);
  };

  return (
    <div style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "20px"
    }}>
      <h3>Controls</h3>
      <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <label>Grid Size (p): </label>
          <input 
            type="number" 
            value={p} 
            onChange={e => setP(Number(e.target.value))}
            style={{ padding: "5px", width: "80px" }}
            disabled={isAnimating}
          />
          <small style={{ display: "block" }}>Perfect square (4-64)</small>
        </div>
        <div>
          <label>Shift Amount (q): </label>
          <input 
            type="number" 
            value={q} 
            onChange={e => setQ(Number(e.target.value))}
            style={{ padding: "5px", width: "80px" }}
            disabled={isAnimating}
          />
          <small style={{ display: "block" }}>1 to {p-1}</small>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isAnimating}
          style={{
            padding: "8px 20px",
            backgroundColor: isAnimating ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isAnimating ? "not-allowed" : "pointer"
          }}
        >
          {isAnimating ? "Animating..." : "Run Animation"}
        </button>
      </div>
    </div>
  );
}