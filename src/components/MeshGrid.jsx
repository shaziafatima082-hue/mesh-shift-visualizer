import React from "react";

export default function MeshGrid({ grid, title }) {
  if (!grid) return null;
  
  const size = grid.length;
  const cellSize = 70;
  
  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <h4>{title}</h4>
      <div style={{ 
        display: "inline-grid", 
        gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
        gap: "2px",
        backgroundColor: "#333",
        padding: "4px",
        borderRadius: "8px"
      }}>
        {grid.flat().map((val, i) => {
          const row = Math.floor(i / size);
          const col = i % size;
          return (
            <div key={i} style={{
              backgroundColor: "white",
              border: "1px solid #999",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: `${cellSize}px`,
              fontSize: "14px",
              fontWeight: "bold"
            }}>
              <div>#{val}</div>
              <div style={{ fontSize: "10px", color: "#666" }}>({row},{col})</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}